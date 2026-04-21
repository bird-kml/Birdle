/*
BIRD TYPES GUIDE (Birdle Reference File)
This file is only for explanations and UI tooltips.
It should NOT affect game logic.
*/
const BIRD_TYPE_GUIDE = {
   RAPTOR: {
       name: "Raptor",
       description: "Birds of prey that hunt other animals using sharp vision and strong talons.",
       examples: ["Eagle", "Owl", "Falcon", "Vulture"],
       traits: ["Carnivorous", "Strong claws", "Hooked beak", "Excellent vision"]
   },
   WATERFOWL: {
       name: "Waterfowl",
       description: "Birds adapted to living on or near water, often with webbed feet.",
       examples: ["Duck", "Goose", "Swan", "Pintail"],
       traits: ["Webbed feet", "Swimming ability", "Often omnivorous or herbivorous"]
   },
   SEABIRD: {
       name: "Seabird",
       description: "Birds that spend most of their life over oceans and feed at sea.",
       examples: ["Albatross", "Gull", "Tern", "Puffin"],
       traits: ["Long-distance flying", "Salt tolerance", "Marine feeding habits"]
   },
   GAMEBIRD: {
       name: "Gamebird",
       description: "Ground-dwelling birds often hunted or living in forests and fields.",
       examples: ["Pheasant", "Capercaillie", "Bustard", "Peafowl"],
       traits: ["Strong legs", "Ground foraging", "Short bursts of flight"]
   },
   FLIGHTLESS: {
       name: "Flightless Bird",
       description: "Birds that have lost the ability to fly, usually adapted for running or swimming.",
       examples: ["Ostrich", "Kiwi", "Penguin", "Kakapo"],
       traits: ["No flight capability", "Strong legs or swimming ability"]
   },
   PASSERINE: {
       name: "Passerine (True Songbirds)",
       description: "Perching birds that make up the largest bird order, often small and vocal.",
       examples: ["Sparrow", "Crow", "Robin", "Finch"],
       traits: ["Perching feet", "Complex vocalization", "Small to medium size"]
   },
   "NEAR-PASSERINE": {
       name: "Near-Passerine",
       description: "Birds similar to songbirds but not true passerines; diverse feeding and behavior.",
       examples: ["Kingfisher", "Woodpecker", "Hornbill", "Cuckoo"],
       traits: ["Varied habitats", "Diverse diets", "Mixed evolutionary groups"]
   },
   "WADING BIRD": {
       name: "Wading Bird",
       description: "Long-legged birds that feed in shallow water.",
       examples: ["Heron", "Ibis", "Stork", "Crane"],
       traits: ["Long legs", "Shallow-water feeding", "Slow hunting style"]
   },
   PARROT: {
       name: "Parrot",
       description: "Highly intelligent birds known for curved beaks and strong social behavior.",
       examples: ["Macaw", "Kakapo", "Parakeet", "Cockatoo"],
       traits: ["Curved beak", "High intelligence", "Often colorful plumage"]
   }
};
window.BIRD_TYPE_GUIDE = BIRD_TYPE_GUIDE;
