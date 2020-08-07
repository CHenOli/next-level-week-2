/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import db from '../database/connection';

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ConnectionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    await db('connections').insert({
      user_id,
    });

    return response.status(201).send();
  }

  async index(request: Request, response: Response): Promise<Response> {
    const connections = await db('connections').count('* as total');
    const { total } = connections[0];
    return response.json({ total });
  }
}
