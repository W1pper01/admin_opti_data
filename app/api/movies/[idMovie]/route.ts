import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Db, MongoClient, ObjectId } from 'mongodb';
import { generateKey } from 'crypto';

export async function GET(request: Request, { params }: { params: { idMovie: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { movie } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}

export async function POST(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const movie = {
      title: "Warhammer New Days",
      year: 2026,
      director: "Arbi Tazeur",
      genre: ["action","drame"],
      plot: "...The last day of Humanity has come"
    };
    
    const result = await db.collection('movies').insertOne(movie);

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

export async function PUT(request: Request, { params }: { params: { idMovie: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
  
    const movie = {
      title: "Warhammer New Days",
      year: 2026,
      director: "Arbi Tazeur",
      genre: ["action","drame"],
      plot: "...The last day of Humanity has come...Never mind Humanity will survive"
    };
    
    const result = await db.collection('movies').updateOne(
      { _id: new ObjectId(idMovie) },
      { $set: movie }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    const updatedMovie = await db.collection('movies').findOne({ _id: new ObjectId(idMovie) });
    
    return NextResponse.json({ 
      status: 200, 
      message: 'Movie updated successfully',
      data: { movie: updatedMovie } 
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}


export async function DELETE(request: Request, { params }: { params: { idMovie: string } }): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    
    const { idMovie } = params;
    if (!ObjectId.isValid(idMovie)) {
      return NextResponse.json({ status: 400, message: 'Invalid movie ID', error: 'ID format is incorrect' });
    }
    
    const movie = await db.collection('movies').deleteOne({ _id: new ObjectId(idMovie) });
    
    if (!movie) {
      return NextResponse.json({ status: 404, message: 'Movie not found', error: 'No movie found with the given ID' });
    }
    
    return NextResponse.json({ status: 200, data: { movie } });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}