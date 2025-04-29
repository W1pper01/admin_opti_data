import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     tags: 
 *       - Theaters Management
 *     description: Returns theaters
 *     responses:
 *       200:
 *         description: Hello Theaters
 */
export async function GET(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const theaters = await db.collection('theaters').find({}).limit(10).toArray();
    
    return NextResponse.json(
	    { status: 200, data: theaters }
		);
  }
  catch (error: any) {
    return NextResponse.json(
	    { status: 500, message: 'Internal Server Error', error: error.message }
    );
  }
}

/**
 * @swagger
 * /api/theaters:
 *   post:
 *     tags: 
 *       - Theaters Management
 *     description: Returns theaters
 *     responses:
 *       200:
 *         description: Hello theaters
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'POST method is not supported' });
}

/**
 * @swagger
 * /api/theaters:
 *   put:
 *     tags: 
 *       - Theaters Management
 *     description: Returns theaters
 *     responses:
 *       404:
 *         description: Hello Theaters
 */
export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'PUT method is not supported' });
}

/**
 * @swagger
 * /api/theaters:
 *   delete:
 *     tags: 
 *       - Theaters Management
 *     description: Returns theaters
 *     responses:
 *       404:
 *         description: Hello Theaters
 */
export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported' });
}