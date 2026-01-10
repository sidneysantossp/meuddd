import { createClient } from '@supabase/supabase-js';
import { brazilianStates } from './src/data/states.js';
import { stateDetailedInfo } from './src/data/stateDetailedInfo.js';

const supabaseUrl = 'https://lmzexdnoqqzgqoeqdqqx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemV4ZG5vcXF6Z3FvZXFkcXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzA2ODIsImV4cCI6MjA4MjE0NjY4Mn0.A7Yqe6ZmtBiNo6cJt1NQJW3URGFp4qABK-Wh-eF81s4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateData() {
  console.log('🚀 Iniciando migração de dados...');
  
  try {
    // Limpar dados existentes
    console.log('🗑️  Limpando dados existentes...');
    await supabase.from('cities').delete().neq('id', 0);
    await supabase.from('states').delete().neq('id', '');
    
    let totalStates = 0;
    let totalCities = 0;
    
    // Migrar estados e cidades
    for (const state of brazilianStates) {
      console.log(`📍 Migrando estado: ${state.name}...`);
      
      const detailedInfo = stateDetailedInfo[state.id];
      
      // Inserir estado
      const { error: stateError } = await supabase
        .from('states')
        .insert({
          id: state.id,
          name: state.name,
          slug: state.slug,
          abbreviation: state.abbreviation,
          region: state.region,
          capital: state.capital,
          population: state.population,
          ddd_codes: state.dddCodes,
          area: detailedInfo?.area || null,
          municipalities: detailedInfo?.municipalities || state.cities.length,
        });
      
      if (stateError) {
        console.error(`❌ Erro ao inserir estado ${state.name}:`, stateError);
        continue;
      }
      
      totalStates++;
      
      // Inserir cidades em lotes de 100
      const batchSize = 100;
      for (let i = 0; i < state.cities.length; i += batchSize) {
        const batch = state.cities.slice(i, i + batchSize);
        const citiesToInsert = batch.map(city => ({
          state_id: state.id,
          name: city.name,
          ddd: city.ddd,
          population: city.population || null,
        }));
        
        const { error: citiesError } = await supabase
          .from('cities')
          .insert(citiesToInsert);
        
        if (citiesError) {
          console.error(`❌ Erro ao inserir cidades do ${state.name}:`, citiesError);
        } else {
          totalCities += batch.length;
          console.log(`  ✅ ${batch.length} cidades inseridas (${i + batch.length}/${state.cities.length})`);
        }
      }
    }
    
    console.log('\n✅ Migração concluída com sucesso!');
    console.log(`📊 Total: ${totalStates} estados e ${totalCities} cidades migradas`);
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    process.exit(1);
  }
}

migrateData();
