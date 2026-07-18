import { db } from '../config/firebase';
import { Lead } from '../types';

export class LeadRepository {
  private collection = db.collection('leads');

  async createLead(lead: Lead): Promise<string> {
    // Si no tiene fecha, le ponemos la actual
    const newLead = {
      ...lead,
      createdAt: lead.createdAt || new Date()
    };
    
    const docRef = await this.collection.add(newLead);
    console.log(`[Firestore] Lead guardado exitosamente. ID: ${docRef.id}`);
    
    return docRef.id;
  }
}
