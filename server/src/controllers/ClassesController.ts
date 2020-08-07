/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const users = await trx('users').insert({
        bio,
        name,
        avatar,
        whatsapp,
      });

      const classes = await trx('classes').insert({
        cost,
        subject,
        user_id: users[0],
      });

      const classSchedules = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          class_id: classes[0],
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      await trx('class_schedules').insert(classSchedules);

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      response.status(400).json({ error: true, message: err });
    }

    return response.status(201).send();
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { week_day, subject, time } = request.query;

    if (!week_day && !subject && !time) {
      return response
        .status(400)
        .json({ error: true, message: 'Select at least one filter!' });
    }

    const minutes = convertHourToMinutes(time as string);

    const classes = await db('classes')
      // eslint-disable-next-line func-names
      .whereExists(function () {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedules`.`from` <= ??', [minutes])
          .whereRaw('`class_schedules`.`to` > ??', [minutes]);
      })
      .where('classes.subject', '=', subject as string)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select('classes.*', 'users.*');

    return response.json(classes);
  }
}
