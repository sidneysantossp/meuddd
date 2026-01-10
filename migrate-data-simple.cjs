#!/usr/bin/env node

// Script de migração de dados para Supabase
// Este script lê os dados dos arquivos TypeScript e os insere no banco de dados

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://lmzexdnoqqzgqoeqdqqx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtemV4ZG5vcXF6Z3FvZXFkcXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NzA2ODIsImV4cCI6MjA4MjE0NjY4Mn0.A7Yqe6ZmtBiNo6cJt1NQJW3URGFp4qABK-Wh-eF81s4';

const supabase = createClient(supabaseUrl, supabaseKey);

// Ler e parsear o arquivo states.ts
function parseStatesFile() {
  const statesPath = path.join(__dirname, 'src', 'data', 'states.ts');
  const content = fs.readFileSync(statesPath, 'utf8');
  
  // Extrair o array de estados usando regex
  const match = content.match(/export const brazilianStates: State\[\] = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Não foi possível extrair os dados dos estados');
  }
  
  // Avaliar o JavaScript (remover tipos TypeScript)
  const statesData = match[1]
    .replace(/: \d+/g, '')  // Remover tipos de número
    .replace(/: '[^']*'/g, match => match)  // Manter strings
    .replace(/: "[^"]*"/g, match => match);  // Manter strings com aspas duplas
  
  return eval(`(${statesData})`);
}

// Ler e parsear o arquivo stateDetailedInfo.ts
function parseDetailedInfoFile() {
  const detailedPath = path.join(__dirname, 'src', 'data', 'stateDetailedInfo.ts');
  const content = fs.readFileSync(detailedPath, 'utf8');
  
  // Extrair o objeto de informações detalhadas
  const match = content.match(/export const stateDetailedInfo[^=]*= (\{[\s\S]*?\});[\s\n]*export/);
  if (!match) {
    throw new Error('Não foi possível extrair as informações detalhadas');
  }
  
  return eval(`(${match[1]})`);
}

async function migrateData() {
  console.log('🚀 Iniciando migração de dados...\n');
  
  try {
    // Parsear arquivos
    console.log('📖 Lendo arquivos de dados...');
    const brazilianStates = parseStatesFile();
    const stateDetailedInfo = parseDetailedInfoFile();
    console.log(`✅ ${brazilianStates.length} estados encontrados\n`);
    
    // Limpar dados existentes
    console.log('🗑️  Limpando dados existentes...');
    await supabase.from('cities').delete().neq('id', 0);
    await supabase.from('states').delete().neq('id', '');
    console.log('✅ Dados limpos\n');
    
    let totalStates = 0;
    let totalCities = 0;
    
    // Migrar estados e cidades
    for (const state of brazilianStates) {
      console.log(`📍 Migrando estado: ${state.name}...`);
      
      const detailedInfo = stateDetailedInfo[state.id] || {};
      
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
          area: detailedInfo.area || null,
          municipalities: detailedInfo.municipalities || state.cities.length,
        });
      
      if (stateError) {
        console.error(`❌ Erro ao inserir estado ${state.name}:`, stateError.message);
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
          console.error(`❌ Erro ao inserir cidades do ${state.name}:`, citiesError.message);
        } else {
          totalCities += batch.length;
          console.log(`  ✅ ${batch.length} cidades inseridas (${i + batch.length}/${state.cities.length})`);
        }
      }
      
      console.log('');
    }
    
    console.log('✅ Migração concluída com sucesso!');
    console.log(`📊 Total: ${totalStates} estados e ${totalCities} cidades migradas`);
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

migrateData();
