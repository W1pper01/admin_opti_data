import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { generateKey } from 'crypto';


/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idCmments}:
 *   get:
 *     summary: Get a comments by movie ID
 *     description: Retrieve a single comment document by its MongoDB movie ObjectId.
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
export async function GET(request: Request, { params }: { params: { idMovie: string, idComments: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComments } = params;

    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const movie = await db.collection('comments').findOne({ movie_id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { movie } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}/comments/:
 *   post:
 *     summary: Add an entry in movie collection
 *     description: Add a single movie document by its MongoDB ObjectId.
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
 export async function POST(): Promise<NextResponse> {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db('sample_mflix');
      
      const comment = {
        name: "Arbi Tazeur",
        email: "arbi.tazeur@fqdn.com",
        movie_id: "",
        texte: "Film incroyable, un lore de qualité totalement respecté. ps: On veut plus de Nekron",
        date: "2025-04-11T08:57:05.000Z"
      };      
      const result = await db.collection('comments').insertOne(comment);
  
      const newMovie = await db.collection('movies').findOne({ _id: result.insertedId });
      
      return NextResponse.json({ 
        status: 201, 
        message: 'Movie created successfully',
        data: { movie: newMovie } 
      });
    } catch (error: any) {
      return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }

  /**
   * @swagger
   * /api/movies/{idMovie}/comments:
   *   put:
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
   *     description: Delete Comments
   *     responses:
   *       404:
   *         description: Hello Comments
   */
  export async function DELETE(): Promise<NextResponse> {
    return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported' });
  }
