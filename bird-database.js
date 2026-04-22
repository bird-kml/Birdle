const BIRD_TYPES = {
    RAPTOR: "Raptor",
    WATERFOWL: "Waterfowl",
    SEABIRD: "Seabird",
    GAMEBIRD: "Gamebird",
    FLIGHTLESS: "Flightless",
    PASSERINE: "Passerine",
    NEAR_PASSERINE: "Near-Passerine",
    WADING_BIRD: "Wading Bird",
    PARROT: "Parrot"
};

const BIRD_DATABASE = [

/* FLIGHTLESS */
{ name: "Ostrich",         type: BIRD_TYPES.FLIGHTLESS, color: "Black",      size: "Huge",   habitat: "Grassland", diet: "Omnivore"  },
{ name: "Emu",             type: BIRD_TYPES.FLIGHTLESS, color: "Brown",      size: "Huge",   habitat: "Grassland", diet: "Omnivore"  },
{ name: "Kiwi",            type: BIRD_TYPES.FLIGHTLESS, color: "Brown",      size: "Small",  habitat: "Forest",    diet: "Omnivore"  },
{ name: "Penguin",         type: BIRD_TYPES.FLIGHTLESS, color: "Black",      size: "Medium", habitat: "Coastal",   diet: "Carnivore" },
{ name: "Emperor Penguin", type: BIRD_TYPES.FLIGHTLESS, color: "Black",      size: "Large",  habitat: "Arctic",    diet: "Carnivore" },
{ name: "Dodo",            type: BIRD_TYPES.FLIGHTLESS, color: "Gray",       size: "Large",  habitat: "Forest",    diet: "Omnivore"  },

/* SEABIRD */
{ name: "Albatross",       type: BIRD_TYPES.SEABIRD,    color: "White",      size: "Huge",   habitat: "Ocean",     diet: "Carnivore" },
{ name: "Petrel",          type: BIRD_TYPES.SEABIRD,    color: "White",      size: "Small",  habitat: "Ocean",     diet: "Carnivore" },
{ name: "Gannet",          type: BIRD_TYPES.SEABIRD,    color: "White",      size: "Large",  habitat: "Coastal",   diet: "Carnivore" },
{ name: "Frigatebird",     type: BIRD_TYPES.SEABIRD,    color: "Black",      size: "Large",  habitat: "Coastal",   diet: "Carnivore" },
{ name: "Gull",            type: BIRD_TYPES.SEABIRD,    color: "White",      size: "Small",  habitat: "Coastal",   diet: "Carnivore" },
{ name: "Seagull",         type: BIRD_TYPES.SEABIRD,    color: "White",      size: "Medium", habitat: "Coastal",   diet: "Omnivore"  },
{ name: "Puffin",          type: BIRD_TYPES.SEABIRD,    color: "Black",      size: "Small",  habitat: "Coastal",   diet: "Carnivore" },
{ name: "Loon",            type: BIRD_TYPES.SEABIRD,    color: "Multicolor",      size: "Medium", habitat: "Wetland",     diet: "Carnivore" },

/* WATERFOWL */
{ name: "Pelican",         type: BIRD_TYPES.WATERFOWL,  color: "White",      size: "Huge",   habitat: "Wetland",   diet: "Carnivore" },
{ name: "Swan",            type: BIRD_TYPES.WATERFOWL,  color: "White",      size: "Large",  habitat: "Wetland",   diet: "Herbivore" },
{ name: "Goose",           type: BIRD_TYPES.WATERFOWL,  color: "White",      size: "Medium", habitat: "Wetland",   diet: "Herbivore" },
{ name: "Mallard",         type: BIRD_TYPES.WATERFOWL,  color: "Multicolor", size: "Medium", habitat: "Wetland",   diet: "Omnivore"  },
{ name: "Wood Duck",       type: BIRD_TYPES.WATERFOWL,  color: "Multicolor", size: "Small",  habitat: "Forest",    diet: "Omnivore"  },
{ name: "Eider",           type: BIRD_TYPES.WATERFOWL,  color: "Multicolor", size: "Medium", habitat: "Coastal",   diet: "Carnivore" },
{ name: "Pintail",         type: BIRD_TYPES.WATERFOWL,  color: "Brown",      size: "Medium", habitat: "Wetland",   diet: "Omnivore"  },
{ name: "Nene",            type: BIRD_TYPES.WATERFOWL,  color: "Brown",      size: "Medium", habitat: "Grassland", diet: "Herbivore" },

/* WADING BIRDS */
{ name: "Crane",           type: BIRD_TYPES.WADING_BIRD, color: "White",     size: "Large",  habitat: "Wetland",   diet: "Omnivore"  },
{ name: "Stork",           type: BIRD_TYPES.WADING_BIRD, color: "White",     size: "Large",  habitat: "Wetland",   diet: "Carnivore" },
{ name: "Ibis",            type: BIRD_TYPES.WADING_BIRD, color: "Red",       size: "Medium", habitat: "Wetland",   diet: "Carnivore" },
{ name: "Spoonbill",       type: BIRD_TYPES.WADING_BIRD, color: "White",     size: "Medium", habitat: "Wetland",   diet: "Carnivore" },
{ name: "Flamingo",        type: BIRD_TYPES.WADING_BIRD, color: "Multicolor",size: "Medium", habitat: "Wetland",   diet: "Omnivore"  },
{ name: "Shoebill",        type: BIRD_TYPES.WADING_BIRD, color: "Gray",      size: "Huge",  habitat: "Wetland",   diet: "Carnivore" },
{ name: "Heron",           type: BIRD_TYPES.WADING_BIRD, color: "Gray",      size: "Large",  habitat: "Wetland",   diet: "Carnivore" },
{ name: "Stilt",           type: BIRD_TYPES.WADING_BIRD, color: "Black",     size: "Small",  habitat: "Wetland",   diet: "Carnivore" },
{ name: "Plover",          type: BIRD_TYPES.WADING_BIRD, color: "Multicolor",size: "Small",  habitat: "Coastal",   diet: "Carnivore" },
{ name: "Lapwing",         type: BIRD_TYPES.WADING_BIRD, color: "Green",     size: "Small",  habitat: "Grassland", diet: "Omnivore"  },
{ name: "Sandpiper",       type: BIRD_TYPES.WADING_BIRD, color: "Brown",     size: "Tiny",   habitat: "Coastal",   diet: "Carnivore" },
{ name: "Phalarope",       type: BIRD_TYPES.WADING_BIRD, color: "Gray",      size: "Tiny",   habitat: "Ocean",     diet: "Omnivore"  },
{ name: "Cinnamon Bittern",type: BIRD_TYPES.WADING_BIRD, color: "Orange",    size: "Medium", habitat: "Wetland",   diet: "Carnivore" },

/* RAPTORS */
{ name: "Condor",          type: BIRD_TYPES.RAPTOR,      color: "Black",     size: "Huge",   habitat: "Mountain",  diet: "Carnivore" },
{ name: "Vulture",         type: BIRD_TYPES.RAPTOR,      color: "Brown",     size: "Huge",   habitat: "Grassland", diet: "Carnivore" },
{ name: "Eagle",           type: BIRD_TYPES.RAPTOR,      color: "Multicolor",size: "Large",  habitat: "Mountain",  diet: "Carnivore" },
{ name: "Bald Eagle",      type: BIRD_TYPES.RAPTOR,      color: "White",     size: "Large",  habitat: "Forest",    diet: "Carnivore" },
{ name: "Hawk",            type: BIRD_TYPES.RAPTOR,      color: "Brown",     size: "Large",  habitat: "Grassland", diet: "Carnivore" },
{ name: "Falcon",          type: BIRD_TYPES.RAPTOR,      color: "Gray",      size: "Medium", habitat: "Desert",    diet: "Carnivore" },
{ name: "Harrier",         type: BIRD_TYPES.RAPTOR,      color: "Brown",     size: "Medium", habitat: "Grassland", diet: "Carnivore" },
{ name: "Owl",             type: BIRD_TYPES.RAPTOR,      color: "Brown",     size: "Large",  habitat: "Forest",    diet: "Carnivore" },

/* GAMEBIRDS */
{ name: "Turkey",          type: BIRD_TYPES.GAMEBIRD,    color: "Multicolor",size: "Large",  habitat: "Forest",    diet: "Omnivore"  },
{ name: "Chicken",         type: BIRD_TYPES.GAMEBIRD,    color: "Brown",     size: "Medium", habitat: "Grassland", diet: "Omnivore"  },
{ name: "Quail",           type: BIRD_TYPES.GAMEBIRD,    color: "Brown",     size: "Small",  habitat: "Grassland", diet: "Omnivore"  },
{ name: "Peafowl",         type: BIRD_TYPES.GAMEBIRD,    color: "Multicolor",size: "Medium", habitat: "Forest",    diet: "Omnivore"  },
{ name: "Capercaillie",    type: BIRD_TYPES.GAMEBIRD,    color: "Brown",     size: "Large",  habitat: "Forest",    diet: "Herbivore" },
{ name: "Tragopan",        type: BIRD_TYPES.GAMEBIRD,    color: "Multicolor",size: "Medium", habitat: "Mountain",  diet: "Herbivore" },
{ name: "Bustard",         type: BIRD_TYPES.GAMEBIRD,    color: "Brown",     size: "Large",  habitat: "Grassland", diet: "Omnivore"  },

/* PARROTS */
{ name: "Parrot",          type: BIRD_TYPES.PARROT,      color: "Multicolor",size: "Medium", habitat: "Rainforest", diet: "Herbivore" },
{ name: "Macaw",           type: BIRD_TYPES.PARROT,      color: "Blue",      size: "Large",  habitat: "Rainforest", diet: "Herbivore" },
{ name: "Parakeet",        type: BIRD_TYPES.PARROT,      color: "Green",     size: "Small",  habitat: "Rainforest", diet: "Herbivore" },
{ name: "Kakapo",          type: BIRD_TYPES.PARROT,      color: "Green",     size: "Medium", habitat: "Forest",     diet: "Herbivore" },

/* NEAR-PASSERINE */
{ name: "Hummingbird",     type: BIRD_TYPES.NEAR_PASSERINE, color: "Multicolor", size: "Tiny",   habitat: "Rainforest", diet: "Herbivore" },
{ name: "Kingfisher",      type: BIRD_TYPES.NEAR_PASSERINE, color: "Blue",       size: "Small",  habitat: "Wetland",    diet: "Carnivore" },
{ name: "Cuckoo",          type: BIRD_TYPES.NEAR_PASSERINE, color: "Gray",       size: "Medium", habitat: "Forest",     diet: "Carnivore" },
{ name: "Roadrunner",      type: BIRD_TYPES.NEAR_PASSERINE, color: "Brown",      size: "Medium", habitat: "Desert",     diet: "Carnivore" },
{ name: "Hornbill",        type: BIRD_TYPES.NEAR_PASSERINE, color: "Black",      size: "Large",  habitat: "Rainforest", diet: "Omnivore"  },
{ name: "Toucan",          type: BIRD_TYPES.NEAR_PASSERINE, color: "Black",      size: "Large",  habitat: "Rainforest", diet: "Herbivore" },
{ name: "Woodpecker",      type: BIRD_TYPES.NEAR_PASSERINE, color: "Black",      size: "Large",  habitat: "Forest",     diet: "Carnivore" },
{ name: "Hoopoe",          type: BIRD_TYPES.NEAR_PASSERINE, color: "Brown",      size: "Small",  habitat: "Grassland",  diet: "Carnivore" },

/* PASSERINES */
{ name: "Sparrow",         type: BIRD_TYPES.PASSERINE, color: "Brown",      size: "Small",  habitat: "Urban",      diet: "Omnivore"  },
{ name: "Finch",           type: BIRD_TYPES.PASSERINE, color: "Multicolor", size: "Small",  habitat: "Grassland",  diet: "Omnivore"  },
{ name: "Snowfinch",       type: BIRD_TYPES.PASSERINE, color: "White",      size: "Small",  habitat: "Mountain",   diet: "Omnivore"  },
{ name: "Crow",            type: BIRD_TYPES.PASSERINE, color: "Black",      size: "Medium", habitat: "Urban",      diet: "Omnivore"  },
{ name: "Magpie",          type: BIRD_TYPES.PASSERINE, color: "Multicolor", size: "Medium", habitat: "Urban",      diet: "Omnivore"  },
{ name: "Raven",           type: BIRD_TYPES.PASSERINE, color: "Black",      size: "Large",  habitat: "Mountain",   diet: "Omnivore"  },
{ name: "Robin",           type: BIRD_TYPES.PASSERINE, color: "Brown",      size: "Small", habitat: "Forest",     diet: "Omnivore"  },
{ name: "Nightingale",     type: BIRD_TYPES.PASSERINE, color: "Brown",      size: "Small",  habitat: "Grassland",     diet: "Omnivore"  },
{ name: "Warbler",         type: BIRD_TYPES.PASSERINE, color: "Gray",       size: "Tiny",   habitat: "Wetland",    diet: "Omnivore"  },
{ name: "Blue Jay",        type: BIRD_TYPES.PASSERINE, color: "Blue",       size: "Medium", habitat: "Forest",     diet: "Omnivore"  },
{ name: "Great Tit",       type: BIRD_TYPES.PASSERINE, color: "Multicolor", size: "Small",  habitat: "Forest",     diet: "Omnivore"  },
{ name: "Canary",          type: BIRD_TYPES.PASSERINE, color: "Yellow",     size: "Small",  habitat: "Grassland",  diet: "Omnivore"  },
{ name: "Mockingbird",     type: BIRD_TYPES.PASSERINE, color: "Gray",       size: "Small",  habitat: "Urban",      diet: "Omnivore"  },
{ name: "Starling",        type: BIRD_TYPES.PASSERINE, color: "Black",      size: "Small",  habitat: "Urban",      diet: "Omnivore"  },
{ name: "Pigeon",          type: BIRD_TYPES.NEAR_PASSERINE, color: "Gray",       size: "Medium", habitat: "Urban",      diet: "Omnivore"  },
{ name: "Dove",            type: BIRD_TYPES.NEAR_PASSERINE, color: "Gray",       size: "Small",  habitat: "Urban",      diet: "Herbivore" },
{ name: "Cock-of-the-rock",type: BIRD_TYPES.PASSERINE, color: "Red",        size: "Medium", habitat: "Rainforest", diet: "Omnivore"  }

];

function getDailyBird() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
        hash = hash & hash;
    }

    const index = Math.abs(hash) % BIRD_DATABASE.length;
    return BIRD_DATABASE[index];
}

function findBirdByName(name) {
    return BIRD_DATABASE.find(bird =>
        bird.name.toLowerCase() === name.toLowerCase()
    );
}

function getAllBirdNames() {
    return [...new Set(BIRD_DATABASE.map(bird => bird.name))].sort();
}

function getCategoryValues() {
    return {
        types:    [...new Set(BIRD_DATABASE.map(b => b.type))].sort(),
        colors:   [...new Set(BIRD_DATABASE.map(b => b.color))].sort(),
        sizes:    [...new Set(BIRD_DATABASE.map(b => b.size))].sort(),
        habitats: [...new Set(BIRD_DATABASE.map(b => b.habitat))].sort(),
        diets:    [...new Set(BIRD_DATABASE.map(b => b.diet))].sort()
    };
}
