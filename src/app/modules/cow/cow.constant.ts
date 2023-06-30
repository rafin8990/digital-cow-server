export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export const CowLocation: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
]

export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'

export const CowBreed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
]

export type ILabel = 'for sale' | 'sold out'

export const Cowlabel: ILabel[] = ['for sale', 'sold out']

export type ICategory = 'Dairy' | 'Beef' | 'DualPurpose'

export const CowCategory: ICategory[] = ['Dairy', 'Beef', 'DualPurpose']

export const CowSearchableFields = ['location', 'breed', 'category']
export const CowFilterableFields = [
  'searchTerm',
  'location',
  'breed',
  'category',
]
