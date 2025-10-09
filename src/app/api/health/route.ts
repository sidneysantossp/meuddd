import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('Health check API called');
    
    // Test database connection
    await db.$queryRaw`SELECT 1`;
    
    // Count states
    const stateCount = await db.state.count();
    
    // Count cities
    const cityCount = await db.city.count();
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      stateCount,
      cityCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}