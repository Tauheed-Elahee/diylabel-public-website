// Mock data for print shops across Canada's 20 largest cities
export interface PrintShop {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  specialty: string;
  rating: number;
}

export const mockPrintShops: PrintShop[] = [
  // Toronto, ON
  { id: 1, name: 'Toronto Print Hub', lat: 43.6532, lng: -79.3832, address: '123 Queen St W, Toronto, ON', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
  { id: 2, name: 'King Street Printing', lat: 43.6481, lng: -79.3773, address: '456 King St W, Toronto, ON', specialty: 'Business Cards & Flyers', rating: 4.9 },
  { id: 3, name: 'Distillery Print Co.', lat: 43.6503, lng: -79.3591, address: '789 Front St E, Toronto, ON', specialty: 'Custom Designs', rating: 4.7 },
  
  // Montreal, QC
  { id: 4, name: 'Impression Montréal', lat: 45.5017, lng: -73.5673, address: '321 Rue Saint-Denis, Montréal, QC', specialty: 'Sustainable Materials', rating: 4.6 },
  { id: 5, name: 'Plateau Print Shop', lat: 45.5200, lng: -73.5800, address: '654 Avenue du Mont-Royal, Montréal, QC', specialty: 'Large Format', rating: 4.8 },
  { id: 6, name: 'Old Port Printing', lat: 45.5088, lng: -73.5540, address: '987 Rue Notre-Dame, Montréal, QC', specialty: 'Premium Quality', rating: 4.9 },
  
  // Calgary, AB
  { id: 7, name: 'Stampede Print Co.', lat: 51.0447, lng: -114.0719, address: '123 17th Ave SW, Calgary, AB', specialty: 'T-Shirts & Hoodies', rating: 4.7 },
  { id: 8, name: 'Bow River Printing', lat: 51.0486, lng: -114.0708, address: '456 8th Ave SW, Calgary, AB', specialty: 'Business Cards & Flyers', rating: 4.8 },
  
  // Ottawa, ON
  { id: 9, name: 'Capital Print Co.', lat: 45.4215, lng: -75.6972, address: '123 Bank St, Ottawa, ON', specialty: 'Government Printing', rating: 4.8 },
  { id: 10, name: 'ByWard Print Solutions', lat: 45.4292, lng: -75.6927, address: '456 Somerset St, Ottawa, ON', specialty: 'Custom Designs', rating: 4.9 },
  
  // Edmonton, AB
  { id: 11, name: 'Whyte Ave Printing', lat: 53.5461, lng: -113.4938, address: '789 Whyte Ave, Edmonton, AB', specialty: 'Eco-Friendly', rating: 4.6 },
  { id: 12, name: 'North Saskatchewan Print', lat: 53.5444, lng: -113.4909, address: '321 Jasper Ave, Edmonton, AB', specialty: 'Large Format', rating: 4.7 },
  
  // Mississauga, ON
  { id: 13, name: 'Square One Printing', lat: 43.5890, lng: -79.6441, address: '654 Hurontario St, Mississauga, ON', specialty: 'Business Solutions', rating: 4.8 },
  
  // Winnipeg, MB
  { id: 14, name: 'Portage Print Hub', lat: 49.8951, lng: -97.1384, address: '987 Portage Ave, Winnipeg, MB', specialty: 'T-Shirts & Hoodies', rating: 4.5 },
  { id: 15, name: 'Exchange District Print', lat: 49.8988, lng: -97.1372, address: '147 Main St, Winnipeg, MB', specialty: 'Vintage Designs', rating: 4.7 },
  
  // Vancouver, BC
  { id: 16, name: 'Granville Print Co.', lat: 49.2827, lng: -123.1207, address: '258 Granville St, Vancouver, BC', specialty: 'Sustainable Materials', rating: 4.9 },
  { id: 17, name: 'Gastown Printing', lat: 49.2845, lng: -123.1088, address: '369 Water St, Vancouver, BC', specialty: 'Premium Quality', rating: 4.8 },
  { id: 18, name: 'Commercial Drive Print', lat: 49.2606, lng: -123.0695, address: '741 Commercial Dr, Vancouver, BC', specialty: 'Custom Designs', rating: 4.6 },
  
  // Brampton, ON
  { id: 19, name: 'Bramalea Print Solutions', lat: 43.7315, lng: -79.7624, address: '852 Main St N, Brampton, ON', specialty: 'Business Cards', rating: 4.4 },
  
  // Hamilton, ON
  { id: 20, name: 'Steel City Printing', lat: 43.2557, lng: -79.8711, address: '963 King St E, Hamilton, ON', specialty: 'Industrial Printing', rating: 4.7 },
  
  // Quebec City, QC
  { id: 21, name: 'Vieux-Québec Print', lat: 46.8139, lng: -71.2080, address: '174 Rue Saint-Jean, Québec, QC', specialty: 'Heritage Designs', rating: 4.8 },
  { id: 22, name: 'Château Frontenac Printing', lat: 46.8118, lng: -71.2058, address: '285 Rue Saint-Louis, Québec, QC', specialty: 'Luxury Materials', rating: 4.9 },
  
  // Surrey, BC
  { id: 23, name: 'Fraser Valley Print', lat: 49.1913, lng: -122.8490, address: '396 King George Blvd, Surrey, BC', specialty: 'Large Format', rating: 4.5 },
  
  // Laval, QC
  { id: 24, name: 'Laval Print Express', lat: 45.6066, lng: -73.7124, address: '507 Boulevard Saint-Martin, Laval, QC', specialty: 'Quick Turnaround', rating: 4.6 },
  
  // Halifax, NS
  { id: 25, name: 'Halifax Harbour Print', lat: 44.6488, lng: -63.5752, address: '618 Barrington St, Halifax, NS', specialty: 'Maritime Themes', rating: 4.7 },
  { id: 26, name: 'Spring Garden Printing', lat: 44.6426, lng: -63.5769, address: '729 Spring Garden Rd, Halifax, NS', specialty: 'Local Artists', rating: 4.8 },
  
  // London, ON
  { id: 27, name: 'Thames Valley Print', lat: 42.9849, lng: -81.2453, address: '830 Richmond St, London, ON', specialty: 'University Merch', rating: 4.6 },
  
  // Markham, ON
  { id: 28, name: 'Markham Print Centre', lat: 43.8561, lng: -79.3370, address: '941 Highway 7, Markham, ON', specialty: 'Tech Company Swag', rating: 4.7 },
  
  // Gatineau, QC
  { id: 29, name: 'Outaouais Print Shop', lat: 45.4765, lng: -75.7013, address: '152 Boulevard Gréber, Gatineau, QC', specialty: 'Bilingual Services', rating: 4.5 },
  
  // Saskatoon, SK
  { id: 30, name: 'Prairie Print Co.', lat: 52.1579, lng: -106.6702, address: '263 2nd Ave S, Saskatoon, SK', specialty: 'Agricultural Themes', rating: 4.6 },
  
  // Longueuil, QC
  { id: 31, name: 'South Shore Printing', lat: 45.5312, lng: -73.5185, address: '374 Rue Saint-Charles, Longueuil, QC', specialty: 'Family Business', rating: 4.4 },
  
  // Burnaby, BC
  { id: 32, name: 'Metrotown Print Hub', lat: 49.2237, lng: -122.9965, address: '485 Central Blvd, Burnaby, BC', specialty: 'Shopping Mall Kiosks', rating: 4.5 },
  
  // Regina, SK
  { id: 33, name: 'Queen City Print', lat: 50.4452, lng: -104.6189, address: '596 Victoria Ave, Regina, SK', specialty: 'Government Services', rating: 4.7 },
  
  // Richmond, BC
  { id: 34, name: 'Richmond Centre Print', lat: 49.1666, lng: -123.1336, address: '607 No. 3 Rd, Richmond, BC', specialty: 'Multicultural Designs', rating: 4.6 }
];