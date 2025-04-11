import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { generateKey } from 'crypto';


/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   get:
 *     tags: 
 *       - Movie Comments Operations
 *     summary: Get a comments by movie ID
 *     description: Retrieve all comments documents by a MongoDB movie ObjectId.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *     responses:
 *       200:
 *         description: Movie found
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
export async function GET(request: Request, { params }: { params: { idMovie: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const comment = await db.collection('comments').find({ movie_id: new ObjectId(idMovie) }).limit(10).toArray();
    
    if (!comment) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { comment } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   post:
 *     tags: 
 *       - Movie Comments Operations
 *     description: Add movies
 *     responses:
 *       200:
 *         description: Hello Comments
 */
 export async function POST(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'POST method is not supported' });
  }
  
  /**
   * @swagger
   * /api/movies/{idMovie}/comments:
   *   put:
   *     tags: 
 *          - Movie Comments Operations
   *     description: Modify comments
   *     responses:
   *       404:
   *         description: Hello Comments
   */
  export async function PUT(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'PUT method is not supported' });
  }
  
/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   delete:
 *     tags: 
 *       - Movie Comments Operations
 *     description: Delete Comments
 *     responses:
 *       404:
 *         description: Hello Comments
 */
  export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported' });
  }