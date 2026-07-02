export interface Voyage {
  id: string;
  vessel: string;
  rig: string;
  portBegan: string;
  portEnded: string;
  date: string;
  route: string;
}

export interface Sailor {
  id: string;
  name: string;
  hometown: string;
  yearOfBirth: string;
  description: {
    complexion: string;
    height: string;
    hairColor: string;
    markings: string;
  };
  voyages: Voyage[];
}

export const sailors: Sailor[] = [
  {
    id: "peter-johnson",
    name: "Peter Johnson",
    hometown: "Lewes, Delaware",
    yearOfBirth: "1788",
    description: {
      complexion: "Light",
      height: "5' 3¾\"",
      hairColor: "Dark",
      markings: "—",
    },
    voyages: [
      { id: "v1", vessel: "Ship Jane", rig: "Ship", portBegan: "Philadelphia", portEnded: "Liverpool", date: "12/23/1815", route: "Philadelphia to Liverpool" },
      { id: "v2", vessel: "Ship Jane", rig: "Ship", portBegan: "Liverpool", portEnded: "Philadelphia", date: "7/19/1816",  route: "Liverpool to Philadelphia" },
      { id: "v3", vessel: "Ship Jane", rig: "Ship", portBegan: "Philadelphia", portEnded: "London", date: "12/19/1816", route: "Philadelphia to London" },
      { id: "v4", vessel: "Ship Jane", rig: "Ship", portBegan: "London", portEnded: "Philadelphia", date: "9/23/1817",  route: "London to Philadelphia" },
      { id: "v5", vessel: "Ship Jane", rig: "Ship", portBegan: "Philadelphia", portEnded: "Kingston", date: "1/29/1818",  route: "Philadelphia to Kingston" },
      { id: "v6", vessel: "Ship Jane", rig: "Ship", portBegan: "Kingston", portEnded: "Philadelphia", date: "7/27/1818",  route: "Kingston to Philadelphia" },
    ],
  },
  {
    id: "james-forten",
    name: "James Forten",
    hometown: "Philadelphia, Pennsylvania",
    yearOfBirth: "1766",
    description: {
      complexion: "Black",
      height: "5' 8\"",
      hairColor: "Black",
      markings: "Scar on left hand",
    },
    voyages: [
      { id: "v1", vessel: "The Fair American", rig: "Privateer", portBegan: "Philadelphia", portEnded: "Caribbean", date: "1780", route: "Philadelphia to Caribbean" },
      { id: "v2", vessel: "Royal Louis",        rig: "Ship", portBegan: "Philadelphia", portEnded: "Philadelphia", date: "1781", route: "Philadelphia Coast Guard" },
    ],
  },
  {
    id: "william-smith",
    name: "William Smith",
    hometown: "Wilmington, Delaware",
    yearOfBirth: "1772",
    description: {
      complexion: "Dark",
      height: "5' 10\"",
      hairColor: "Brown",
      markings: "Tattoo on right forearm",
    },
    voyages: [
      { id: "v1", vessel: "Betsey", rig: "Brig", portBegan: "Wilmington", portEnded: "London", date: "3/14/1801", route: "Wilmington to London" },
      { id: "v2", vessel: "Betsey", rig: "Brig", portBegan: "London", portEnded: "Wilmington", date: "9/2/1801",  route: "London to Wilmington" },
      { id: "v3", vessel: "Providence", rig: "Schooner", portBegan: "Wilmington", portEnded: "Barbados", date: "5/17/1803", route: "Wilmington to Barbados" },
    ],
  },
  {
    id: "thomas-jones",
    name: "Thomas Jones",
    hometown: "New Castle, Delaware",
    yearOfBirth: "1780",
    description: {
      complexion: "Ruddy",
      height: "5' 6\"",
      hairColor: "Red",
      markings: "Missing tip of left index finger",
    },
    voyages: [
      { id: "v1", vessel: "Sally", rig: "Sloop", portBegan: "New Castle", portEnded: "Bordeaux", date: "6/1/1808",  route: "New Castle to Bordeaux" },
      { id: "v2", vessel: "Sally", rig: "Sloop", portBegan: "Bordeaux", portEnded: "New Castle", date: "11/9/1808", route: "Bordeaux to New Castle" },
    ],
  },
];
