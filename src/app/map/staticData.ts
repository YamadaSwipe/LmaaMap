// Données statiques de points d'eau pour le Maroc et la France
export const staticWaterPoints = [
  // MAROC - Principales villes
  // Casablanca
  { id: 'ma-cas-001', name: 'Fontaine Hassan II', latitude: 33.5969, longitude: -7.6192, address: 'Mosquée Hassan II, Casablanca', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-cas-002', name: 'Hotel Kenzi Tower', latitude: 33.5889, longitude: -7.6114, address: 'Bd de la Corniche, Casablanca', type: 'partner' as const, status: 'active' as const, hours: '24h/24' },
  { id: 'ma-cas-003', name: 'Fontaine Place Mohammed V', latitude: 33.5731, longitude: -7.5898, address: 'Place Mohammed V, Casablanca', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-cas-004', name: 'Café Central', latitude: 33.5892, longitude: -7.6103, address: 'Centre-ville, Casablanca', type: 'partner' as const, status: 'active' as const, hours: '7h-21h' },
  
  // Rabat
  { id: 'ma-rab-001', name: 'Fontaine Place Mohammed V', latitude: 34.0195, longitude: -6.8322, address: 'Place Mohammed V, Rabat', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-rab-002', name: 'Café de la Paix', latitude: 34.0209, longitude: -6.8416, address: 'Avenue Mohammed V, Rabat', type: 'partner' as const, status: 'active' as const, hours: '7h-20h' },
  { id: 'ma-rab-003', name: 'Fontaine Chellah', latitude: 34.0063, longitude: -6.8221, address: 'Site de Chellah, Rabat', type: 'fountain' as const, status: 'active' as const },
  
  // Marrakech
  { id: 'ma-mar-001', name: 'Fontaine Jemaa el-Fna', latitude: 31.6295, longitude: -7.9890, address: 'Place Jemaa el-Fna, Marrakech', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-mar-002', name: 'Restaurant La Mamounia', latitude: 31.6186, longitude: -8.0398, address: 'Avenue Bab Jdid, Marrakech', type: 'partner' as const, status: 'active' as const, hours: '6h-23h' },
  { id: 'ma-mar-003', name: 'Fontaine Bahia Palace', latitude: 31.6217, longitude: -7.9838, address: 'Palais de la Bahia, Marrakech', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-mar-004', name: 'Café des Épices', latitude: 31.6276, longitude: -7.9897, address: 'Souk des Épices, Marrakech', type: 'partner' as const, status: 'active' as const, hours: '8h-20h' },
  
  // Fès
  { id: 'ma-fes-001', name: 'Fontaine Publique - Fès', latitude: 34.0181, longitude: -5.0078, address: 'Médina de Fès', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-fes-002', name: 'Fontaine Bab Boujloud', latitude: 34.0643, longitude: -4.9761, address: 'Bab Boujloud, Fès', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-fes-003', name: 'Riad Fès', latitude: 34.0372, longitude: -4.9998, address: 'Médina de Fès', type: 'partner' as const, status: 'active' as const, hours: '24h/24' },
  
  // Tanger
  { id: 'ma-tan-001', name: 'Fontaine Kasbah', latitude: 35.7595, longitude: -5.8340, address: 'Kasbah de Tanger', type: 'fountain' as const, status: 'active' as const },
  { id: 'ma-tan-002', name: 'Hotel Continental', latitude: 35.7713, longitude: -5.8122, address: 'Dar Baroud, Tanger', type: 'partner' as const, status: 'active' as const, hours: '24h/24' },
  
  // Agadir
  { id: 'ma-aga-001', name: 'Hotel Agadir Beach', latitude: 30.4278, longitude: -9.5981, address: 'Front de mer, Agadir', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-aga-002', name: 'Fontaine Marina', latitude: 30.4203, longitude: -9.5958, address: 'Marina d\'Agadir', type: 'fountain', status: 'active' },
  
  // Meknès
  { id: 'ma-mek-001', name: 'Café Central', latitude: 33.8935, longitude: -5.5473, address: 'Place el-Hedim, Meknès', type: 'partner', status: 'active', hours: '6h-22h' },
  { id: 'ma-mek-002', name: 'Fontaine Bab Mansour', latitude: 33.8938, longitude: -5.5555, address: 'Bab Mansour, Meknès', type: 'fountain', status: 'active' },
  
  // FRANCE - Principales villes
  // Paris
  { id: 'fr-par-001', name: 'Fontaine des Innocents', latitude: 48.8606, longitude: 2.3522, address: 'Place Joachim-du-Bellay, Paris', type: 'fountain', status: 'active' },
  { id: 'fr-par-002', name: 'Fontaine Saint-Michel', latitude: 48.8534, longitude: 2.3426, address: 'Place Saint-Michel, Paris', type: 'fountain', status: 'active' },
  { id: 'fr-par-003', name: 'Café de Flore', latitude: 48.8542, longitude: 2.3320, address: 'Boulevard Saint-Germain, Paris', type: 'partner', status: 'active', hours: '7h-22h' },
  { id: 'fr-par-004', name: 'Fontaine Wallace - Châtelet', latitude: 48.8583, longitude: 2.3472, address: 'Place du Châtelet, Paris', type: 'fountain', status: 'active' },
  { id: 'fr-par-005', name: 'Fontaine Stravinsky', latitude: 48.8578, longitude: 2.3522, address: 'Place Igor-Stravinsky, Paris', type: 'fountain', status: 'active' },
  
  // Lyon
  { id: 'fr-lyo-001', name: 'Fontaine Bartholdi', latitude: 45.7640, longitude: 4.8357, address: 'Place des Terreaux, Lyon', type: 'fountain', status: 'active' },
  { id: 'fr-lyo-002', name: 'Fontaine Place Bellecour', latitude: 45.7578, longitude: 4.8320, address: 'Place Bellecour, Lyon', type: 'fountain', status: 'active' },
  { id: 'fr-lyo-003', name: 'Brasserie Georges', latitude: 45.7520, longitude: 4.8425, address: 'Cours de Verdun, Lyon', type: 'partner', status: 'active', hours: '8h-23h' },
  
  // Marseille
  { id: 'fr-mar-001', name: 'Café de la Paix', latitude: 43.2965, longitude: 5.3698, address: 'Vieux Port, Marseille', type: 'partner', status: 'active', hours: '7h-21h' },
  { id: 'fr-mar-002', name: 'Fontaine Cantini', latitude: 43.2904, longitude: 5.3810, address: 'Cours Julien, Marseille', type: 'fountain', status: 'active' },
  { id: 'fr-mar-003', name: 'Fontaine Vieux-Port', latitude: 43.2949, longitude: 5.3756, address: 'Quai du Port, Marseille', type: 'fountain', status: 'active' },
  
  // Toulouse
  { id: 'fr-tou-001', name: 'Fontaine Place Capitole', latitude: 43.6047, longitude: 1.4442, address: 'Place du Capitole, Toulouse', type: 'fountain', status: 'active' },
  { id: 'fr-tou-002', name: 'Fontaine Wilson', latitude: 43.6108, longitude: 1.4427, address: 'Place Wilson, Toulouse', type: 'fountain', status: 'active' },
  { id: 'fr-tou-003', name: 'Café Le Florida', latitude: 43.6043, longitude: 1.4437, address: 'Place du Capitole, Toulouse', type: 'partner', status: 'active', hours: '7h-20h' },
  
  // Nice
  { id: 'fr-nic-001', name: 'Hotel Negresco', latitude: 43.6947, longitude: 7.2548, address: 'Promenade des Anglais, Nice', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'fr-nic-002', name: 'Fontaine Place Masséna', latitude: 43.6956, longitude: 7.2706, address: 'Place Masséna, Nice', type: 'fountain', status: 'active' },
  { id: 'fr-nic-003', name: 'Fontaine Promenade', latitude: 43.6920, longitude: 7.2583, address: 'Promenade des Anglais, Nice', type: 'fountain', status: 'active' },
  
  // Strasbourg
  { id: 'fr-str-001', name: 'Café des Arts', latitude: 48.5734, longitude: 7.7521, address: 'Place Kléber, Strasbourg', type: 'partner', status: 'active', hours: '8h-20h' },
  { id: 'fr-str-002', name: 'Fontaine Place Kléber', latitude: 48.5844, longitude: 7.7507, address: 'Place Kléber, Strasbourg', type: 'fountain', status: 'active' },
  
  // Bordeaux
  { id: 'fr-bor-001', name: 'Fontaine Miroir d\'Eau', latitude: 44.8378, longitude: -0.5792, address: 'Place de la Bourse, Bordeaux', type: 'fountain', status: 'active' },
  { id: 'fr-bor-002', name: 'Fontaine des Trois Grâces', latitude: 44.8410, longitude: -0.5732, address: 'Cours de l\'Intendance, Bordeaux', type: 'fountain', status: 'active' },
  { id: 'fr-bor-003', name: 'Le Grand Café', latitude: 44.8404, longitude: -0.5805, address: 'Cours de l\'Intendance, Bordeaux', type: 'partner', status: 'active', hours: '7h-22h' },
  
  // Nancy
  { id: 'fr-nan-001', name: 'Fontaine Place Stanislas', latitude: 48.6937, longitude: 6.1834, address: 'Place Stanislas, Nancy', type: 'fountain', status: 'active' },
  { id: 'fr-nan-002', name: 'Fontaine Neptune', latitude: 48.6925, longitude: 6.1842, address: 'Place Stanislas, Nancy', type: 'fountain', status: 'active' },
  
  // Lille
  { id: 'fr-lil-001', name: 'Fontaine Grand\'Place', latitude: 50.6365, longitude: 3.0635, address: 'Grand Place, Lille', type: 'fountain', status: 'active' },
  { id: 'fr-lil-002', name: 'Brasserie de la Paix', latitude: 50.6292, longitude: 3.0573, address: 'Place du Théâtre, Lille', type: 'partner', status: 'active', hours: '8h-21h' },
  
  // Montpellier
  { id: 'fr-mon-001', name: 'Fontaine Place de la Comédie', latitude: 43.6081, longitude: 3.8767, address: 'Place de la Comédie, Montpellier', type: 'fountain', status: 'active' },
  { id: 'fr-mon-002', name: 'Fontaine des Trois Grâces', latitude: 43.6085, longitude: 3.8794, address: 'Esplanade Charles-de-Gaulle, Montpellier', type: 'fountain', status: 'active' },
  
  // Nantes
  { id: 'fr-nan-003', name: 'Fontaine Place Royale', latitude: 47.2126, longitude: -1.5603, address: 'Place Royale, Nantes', type: 'fountain', status: 'active' },
  { id: 'fr-nan-004', name: 'Café du Commerce', latitude: 47.2184, longitude: -1.5536, address: 'Place du Commerce, Nantes', type: 'partner', status: 'active', hours: '7h-21h' },

  // SUD DU MAROC - Région enrichie pour les voyageurs
  // Ouarzazate et région
  { id: 'ma-sud-001', name: 'Fontaine Oasis - Ouarzazate', latitude: 30.9189, longitude: -6.8934, address: 'Centre ville, Ouarzazate', type: 'fountain', status: 'active', description: 'Porte du désert' },
  { id: 'ma-sud-002', name: 'Hotel Atlas Studios', latitude: 30.9335, longitude: -6.9370, address: 'Route de Marrakech, Ouarzazate', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sud-003', name: 'Fontaine Kasbah Ait Benhaddou', latitude: 31.0475, longitude: -7.1318, address: 'Ksar Ait Benhaddou', type: 'fountain', status: 'active', description: 'Site UNESCO' },
  
  // Vallée du Drâa
  { id: 'ma-sud-004', name: 'Hotel Kasbah - Zagora', latitude: 30.3285, longitude: -5.8372, address: 'Route de M\'Hamid, Zagora', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sud-005', name: 'Fontaine Vallée du Drâa', latitude: 30.3347, longitude: -5.8416, address: 'Vallée du Drâa, Zagora', type: 'fountain', status: 'active', description: 'Oasis verdoyante' },
  { id: 'ma-sud-006', name: 'Auberge du Désert - M\'Hamid', latitude: 29.8261, longitude: -5.7272, address: 'M\'Hamid El Ghizlane', type: 'partner', status: 'active', hours: '6h-22h', description: 'Porte du Sahara' },
  { id: 'ma-sud-007', name: 'Café des Nomades - Tamegroute', latitude: 30.0167, longitude: -5.8667, address: 'Village de Tamegroute', type: 'partner', status: 'active', hours: '8h-20h' },
  
  // Skoura et vallées
  { id: 'ma-sud-008', name: 'Fontaine Oasis Skoura', latitude: 31.0595, longitude: -6.5567, address: 'Palmeraie de Skoura', type: 'fountain', status: 'active', description: 'Cœur de la palmeraie' },
  { id: 'ma-sud-009', name: 'Kasbah Amridil - Skoura', latitude: 31.0542, longitude: -6.5623, address: 'Skoura', type: 'partner', status: 'active', hours: '9h-18h' },
  
  // Tinghir et Gorges du Todra
  { id: 'ma-sud-010', name: 'Café Restaurant Tinghir', latitude: 31.5145, longitude: -5.5331, address: 'Centre de Tinghir', type: 'partner', status: 'active', hours: '7h-21h' },
  { id: 'ma-sud-011', name: 'Fontaine Gorges du Todra', latitude: 31.5893, longitude: -5.5969, address: 'Gorges du Todra', type: 'fountain', status: 'active', description: 'Gorges spectaculaires' },
  { id: 'ma-sud-012', name: 'Hotel Yasmina Todra', latitude: 31.5847, longitude: -5.5891, address: 'Gorges du Todra', type: 'partner', status: 'active', hours: '24h/24' },
  
  // Désert de Merzouga
  { id: 'ma-sud-013', name: 'Auberge Merzouga', latitude: 31.0801, longitude: -4.0135, address: 'Erg Chebbi, Merzouga', type: 'partner', status: 'active', hours: '24h/24', description: 'Dunes de l\'Erg Chebbi' },
  { id: 'ma-sud-014', name: 'Hotel Kasbah Tizimi', latitude: 31.0912, longitude: -4.0072, address: 'Village de Merzouga', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sud-015', name: 'Fontaine Erfoud', latitude: 31.4341, longitude: -4.2249, address: 'Centre d\'Erfoud', type: 'fountain', status: 'active', description: 'Ville des fossiles' },
  { id: 'ma-sud-016', name: 'Fontaine Rissani', latitude: 31.2798, longitude: -4.2591, address: 'Souk de Rissani', type: 'fountain', status: 'active', description: 'Berceau des Alaouites' },
  
  // Anti-Atlas
  { id: 'ma-sud-017', name: 'Fontaine Anti-Atlas - Tazenakht', latitude: 30.5708, longitude: -7.2033, address: 'Centre de Tazenakht', type: 'fountain', status: 'active', description: 'Capitale du tapis berbère' },
  { id: 'ma-sud-018', name: 'Auberge Amellago', latitude: 30.7234, longitude: -7.0145, address: 'Route de Tazenakht', type: 'partner', status: 'active', hours: '24h/24' },
  
  // Dadès et routes de montagne
  { id: 'ma-sud-019', name: 'Hotel Xaluca Dadès', latitude: 31.4567, longitude: -5.9876, address: 'Vallée du Dadès', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sud-020', name: 'Fontaine Boumalne Dadès', latitude: 31.4542, longitude: -5.9712, address: 'Boumalne du Dadès', type: 'fountain', status: 'active', description: 'Route des Kasbahs' },

  // PROVINCES SAHARIENNES - Extrême Sud du Maroc
  // Guelmim et Tan-Tan
  { id: 'ma-sahara-001', name: 'Hotel Guelmim', latitude: 28.9870, longitude: -10.0574, address: 'Centre de Guelmim', type: 'partner', status: 'active', hours: '24h/24', description: 'Porte du Sahara' },
  { id: 'ma-sahara-002', name: 'Fontaine Place Bir Anzarane', latitude: 28.9845, longitude: -10.0601, address: 'Place Bir Anzarane, Guelmim', type: 'fountain', status: 'active', description: 'Marché aux chameaux' },
  { id: 'ma-sahara-003', name: 'Station Tan-Tan', latitude: 28.4378, longitude: -11.1031, address: 'Centre de Tan-Tan', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sahara-004', name: 'Fontaine Tan-Tan Plage', latitude: 28.1456, longitude: -11.7203, address: 'Tan-Tan Plage', type: 'fountain', status: 'active', description: 'Station balnéaire' },

  // Laâyoune - Chef-lieu des provinces du Sud
  { id: 'ma-sahara-005', name: 'Hotel Laâyoune', latitude: 27.1536, longitude: -13.1994, address: 'Avenue de l\'Islam, Laâyoune', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sahara-006', name: 'Fontaine Place Mechouar', latitude: 27.1478, longitude: -13.1836, address: 'Place Mechouar, Laâyoune', type: 'fountain', status: 'active', description: 'Centre administratif' },
  { id: 'ma-sahara-007', name: 'Café Restaurant El Marsa', latitude: 27.1612, longitude: -13.2134, address: 'Avenue Hassan II, Laâyoune', type: 'partner', status: 'active', hours: '6h-22h' },
  { id: 'ma-sahara-008', name: 'Fontaine Complexe Hassan II', latitude: 27.1489, longitude: -13.1923, address: 'Complexe Hassan II, Laâyoune', type: 'fountain', status: 'active' },

  // Smara - Ville historique
  { id: 'ma-sahara-009', name: 'Hotel Smara', latitude: 26.7318, longitude: -11.6718, address: 'Centre de Smara', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sahara-010', name: 'Fontaine Zaouia Ma El Ainine', latitude: 26.7289, longitude: -11.6745, address: 'Zaouia Ma El Ainine, Smara', type: 'fountain', status: 'active', description: 'Site historique' },

  // Boujdour - Ville côtière
  { id: 'ma-sahara-011', name: 'Hotel Boujdour', latitude: 26.1265, longitude: -14.4981, address: 'Centre de Boujdour', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sahara-012', name: 'Fontaine Front de Mer', latitude: 26.1234, longitude: -14.5012, address: 'Front de mer, Boujdour', type: 'fountain', status: 'active', description: 'Côte atlantique' },

  // Dakhla - Extrême Sud
  { id: 'ma-sahara-013', name: 'Hotel Dakhla Club', latitude: 23.6845, longitude: -15.9582, address: 'Centre de Dakhla', type: 'partner', status: 'active', hours: '24h/24', description: 'Perle du Sud' },
  { id: 'ma-sahara-014', name: 'Fontaine Place Al Massira', latitude: 23.6812, longitude: -15.9634, address: 'Place Al Massira, Dakhla', type: 'fountain', status: 'active' },
  { id: 'ma-sahara-015', name: 'Resort Dakhla Attitude', latitude: 23.7123, longitude: -15.9423, address: 'Baie de Dakhla', type: 'partner', status: 'active', hours: '24h/24', description: 'Sports nautiques' },
  { id: 'ma-sahara-016', name: 'Fontaine Port de Dakhla', latitude: 23.6934, longitude: -15.9512, address: 'Port de Dakhla', type: 'fountain', status: 'active', description: 'Port de pêche' },

  // Route côtière et points stratégiques
  { id: 'ma-sahara-017', name: 'Station Tarfaya', latitude: 27.9378, longitude: -12.9203, address: 'Centre de Tarfaya', type: 'partner', status: 'active', hours: '8h-20h', description: 'Histoire de l\'Aéropostale' },
  { id: 'ma-sahara-018', name: 'Fontaine Cap Juby', latitude: 27.9423, longitude: -12.9156, address: 'Cap Juby, Tarfaya', type: 'fountain', status: 'active', description: 'Point géographique historique' },
  { id: 'ma-sahara-019', name: 'Auberge El Ouatia', latitude: 25.8734, longitude: -14.2056, address: 'El Ouatia', type: 'partner', status: 'active', hours: '24h/24' },
  { id: 'ma-sahara-020', name: 'Fontaine Aousserd', latitude: 22.5678, longitude: -14.0234, address: 'Aousserd', type: 'fountain', status: 'active', description: 'Poste frontière' }
]