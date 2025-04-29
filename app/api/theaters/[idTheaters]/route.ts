import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { generateKey } from 'crypto';


/**
 * @swagger
 * /api/theaters/{idTheaters}:
 *   get:
 *     tags: 
 *       - Single theaters Operations
 *     summary: Get a theaters by ID
 *     description: Retrieve a single theaters document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idTheaters
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theaters
 *     responses:
 *       200:
 *         description: theaters found
 *       400:
 *         description: Invalid theaters ID
 *       404:
 *         description: theaters not found
 *       500:
 *         description: Internal server error
 */
export async function GET(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheaters } = params;
    if (!ObjectId.isValid(idTheaters)) {
      return NextResponse.json({ status: 400, message: 'Invalid theaters ID', error: 'ID format is incorrect' });
    }
    
    const theaters = await db.collection('theaters').findOne({ _id: new ObjectId(idTheaters) });
    
    if (!theaters) {
      return NextResponse.json({ status: 404, message: 'theaters not found', error: 'No theaters found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { theaters } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheaters}:
 *   post:
 *     tags: 
 *       - Single theaters Operations
 *     summary: Add an entry in theaters collection
 *     description: Add a single theaters document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idTheaters
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theaters
 *     responses:
 *       200:
 *         description: theaters found
 *       400:
 *         description: Invalid theaters ID
 *       404:
 *         description: theaters not found
 *       500:
 *         description: Internal server error
 */
export async function POST(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const theaters = {
        location: {
          address: {
            street1: "340 W Market",
            city: "Bloomington",
            state: "MN",
            zipcode: "55425"
          },
          geo: {
            type: "Point",
            coordinates: [-93.24565, 44.85466]
          }
        }
      };
    
    const result = await db.collection('theaters').insertOne(theaters);

    const newtheaters = await db.collection('theaters').findOne({ _id: result.insertedId });
    
    return NextResponse.json({ 
      status: 201, 
      message: 'theaters created successfully',
      data: { theaters: newtheaters } 
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheaters}:
 *   put:
 *     tags: 
 *       - Single theaters Operations
 *     summary: Modificate a theaters by ID
 *     description: Modificate a single theaters document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idTheaters
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theaters
 *     responses:
 *       200:
 *         description: theaters 
 *       400:
 *         description: Invalid theaters ID
 *       404:
 *         description: theaters not found
 *       500:
 *         description: Internal server error
 */
export async function PUT(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheaters } = params;
    if (!ObjectId.isValid(idTheaters)) {
      return NextResponse.json({ status: 400, message: 'Invalid theaters ID', error: 'ID format is incorrect' });
    }
  
    const theaters = {
        location: {
          address: {
            street1: "123 New Street",
            city: "Bordeaux",
            state: "IL",
            zipcode: "33000"
          },
          geo: {
            type: "Point",
            coordinates: [-89.605, 39.7817]
          }
        }
      };
    
    const result = await db.collection('theaters').updateOne(
      { _id: new ObjectId(idTheaters) },
      { $set: theaters }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: 'theaters not found', error: 'No theaters found with the given ID' });
    }
    
    const updatedtheaters = await db.collection('theaters').findOne({ _id: new ObjectId(idTheaters) });
    
    return NextResponse.json({ 
      status: 200, 
      message: 'theaters updated successfully',
      data: { theaters: updatedtheaters } 
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/theaters/{idTheaters}:
 *   delete:
 *     tags: 
 *       - Single theaters Operations
 *     summary: Delete a theaters by ID
 *     description: Delete a single theaters document by its MongoDB ObjectId.
 *     parameters:
 *       - in: path
 *         name: idTheaters
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the theaters
 *     responses:
 *       200:
 *         description: theaters delete
 *       400:
 *         description: Invalid theaters ID
 *       404:
 *         description: theaters not found
 *       500:
 *         description: Internal server error
 */
export async function DELETE(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idTheaters } = params;
    if (!ObjectId.isValid(idTheaters)) {
      return NextResponse.json({ status: 400, message: 'Invalid theaters ID', error: 'ID format is incorrect' });
    }
    
    const theaters = await db.collection('theaters').deleteOne({ _id: new ObjectId(idTheaters) });
    
    if (!theaters) {
      return NextResponse.json({ status: 404, message: 'theaters not found', error: 'No theaters found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { theaters } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}