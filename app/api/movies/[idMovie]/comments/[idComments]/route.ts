import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { generateKey } from 'crypto';
import { Console } from 'console';


/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComments}:
 *   get:
 *     tags: 
 *       - Single Comment Operations
 *     summary: Get a comments by movie ID
 *     description: Retrieve a single comment document by its MongoDB movie ObjectId.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComments
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
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
export async function GET(request: Request, { params }: { params: any }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie, idComments } = params;

    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    if (!ObjectId.isValid(idComments)) {
        return NextResponse.json({ status: 400, message: 'Invalid comments ID', error: 'ID format is incorrect' });
    }
    
    const comment = await db.collection('comments').findOne({ movie_id: new ObjectId(idMovie), _id: new ObjectId(idComments)});
    
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
 * /api/movies/{idMovie}/comments/{idComments}:
 *   post:
 *     tags: 
 *       - Single Comment Operations
 *     summary: Add an entry in comment collection
 *     description: Add a single movie comment document by its MongoDB movie ObjectId.
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
 export async function POST(request: Request, { params }: { params: { idMovie: string } }): Promise<NextResponse> {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db('sample_mflix');
      
      const { idMovie } = params;

      const comment = {
        name: "Arbi Tazeur",
        email: "arbi.tazeur@fqdn.com",
        movie_id: new ObjectId(idMovie),
        texte: "Film incroyable, un lore de qualité totalement respecté. ps: On veut plus de Nekron",
        date: "2025-04-11T08:57:05.000Z"
      };      
      const result = await db.collection('comments').insertOne(comment);
  
      const newComment = await db.collection('comments').findOne({ _id: result.insertedId });
      
      return NextResponse.json({ 
        status: 201, 
        message: 'Comment created successfully',
        data: { comment: newComment } 
      });
    } catch (error: any) {
      return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }

 /**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComments}:
 *   put:
 *     tags: 
 *       - Single Comment Operations
 *     summary: edit a comment by movie ID
 *     description: Edit a single comment document by its MongoDB movie ObjectId.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComments
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
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
  export async function PUT(request: Request, { params }: { params: { idMovie: string, idComments: string }  }): Promise<NextResponse> {
    try {
        const client: MongoClient = await clientPromise;
        const db: Db = client.db('sample_mflix');
        
        const { idMovie, idComments } = params;

        console.log("idMovie: ", idMovie)
        const comment = {
          name: "Arbi Tazeur",
          email: "arbi.tazeur@fqdn.com",
          movie_id: new ObjectId(idMovie),
          texte: "Film incroyable; Extraordinaire, un lore de qualité totalement respecté. ps: On veut plus de Nekron",
          date: "2025-04-11T08:57:05.000Z"
        };      
        const result = await db.collection('comments').updateOne(
        { _id: new ObjectId(idComments) },
        { $set: comment });
    
        const newComment = await db.collection('comments').findOne({ _id: new ObjectId(idComments) });
        
        return NextResponse.json({ 
          status: 201, 
          message: 'Comment created successfully',
          data: { comment: newComment } 
        });
      } catch (error: any) {
        return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
      }
  }
  
 /**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComments}:
 *   delete:
 *     tags: 
 *       - Single Comment Operations
 *     summary: Delete a comment by movie ID
 *     description: Delete a single comment document by its MongoDB movie ObjectId.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the movie
 *       - in: path
 *         name: idComments
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the comment
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
  export async function DELETE(request: Request, { params }: { params: { idMovie: string, idComments: string } }): Promise<NextResponse> {
    try {
      const client: MongoClient = await clientPromise;
      const db: Db = client.db('sample_mflix');
      
      const { idMovie, idComments } = params;

      if (!ObjectId.isValid(idMovie)) {
        return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
      }
      
      const comment = await db.collection('comments').deleteOne({ _id: new ObjectId(idComments), movie_id: new ObjectId(idMovie) });
      
      if (!comment) {
        return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
      }
      
      return NextResponse.json({ status: 200, data: { comment } });
    } catch (error: any) {
      return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
    }
  }
