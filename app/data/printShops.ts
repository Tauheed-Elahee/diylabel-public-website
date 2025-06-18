// Mock data for print shops across Canada's top 100 cities
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
  // Toronto, ON (Population: 2,794,356)
  { id: 1, name: 'Toronto Print Hub', lat: 43.6532, lng: -79.3832, address: '123 Queen St W, Toronto, ON', specialty: 'T-Shirts & Hoodies', rating: 4.8 },
  { id: 2, name: 'King Street Printing', lat: 43.6481, lng: -79.3773, address: '456 King St W, Toronto, ON', specialty: 'Business Cards & Flyers', rating: 4.9 },
  { id: 3, name: 'Distillery Print Co.', lat: 43.6503, lng: -79.3591, address: '789 Front St E, Toronto, ON', specialty: 'Custom Designs', rating: 4.7 },
  
  // Montreal, QC (Population: 1,762,949)
  { id: 4, name: 'Impression Montréal', lat: 45.5017, lng: -73.5673, address: '321 Rue Saint-Denis, Montréal, QC', specialty: 'Sustainable Materials', rating: 4.6 },
  { id: 5, name: 'Plateau Print Shop', lat: 45.5200, lng: -73.5800, address: '654 Avenue du Mont-Royal, Montréal, QC', specialty: 'Large Format', rating: 4.8 },
  { id: 6, name: 'Old Port Printing', lat: 45.5088, lng: -73.5540, address: '987 Rue Notre-Dame, Montréal, QC', specialty: 'Premium Quality', rating: 4.9 },
  
  // Calgary, AB (Population: 1,336,000)
  { id: 7, name: 'Stampede Print Co.', lat: 51.0447, lng: -114.0719, address: '123 17th Ave SW, Calgary, AB', specialty: 'T-Shirts & Hoodies', rating: 4.7 },
  { id: 8, name: 'Bow River Printing', lat: 51.0486, lng: -114.0708, address: '456 8th Ave SW, Calgary, AB', specialty: 'Business Cards & Flyers', rating: 4.8 },
  { id: 9, name: 'Kensington Print Studio', lat: 51.0515, lng: -114.0832, address: '789 Kensington Rd NW, Calgary, AB', specialty: 'Artisan Crafts', rating: 4.6 },
  
  // Ottawa, ON (Population: 1,017,449)
  { id: 10, name: 'Capital Print Co.', lat: 45.4215, lng: -75.6972, address: '123 Bank St, Ottawa, ON', specialty: 'Government Printing', rating: 4.8 },
  { id: 11, name: 'ByWard Print Solutions', lat: 45.4292, lng: -75.6927, address: '456 Somerset St, Ottawa, ON', specialty: 'Custom Designs', rating: 4.9 },
  { id: 12, name: 'Rideau Print Centre', lat: 45.4235, lng: -75.6979, address: '321 Rideau St, Ottawa, ON', specialty: 'Quick Service', rating: 4.5 },
  
  // Edmonton, AB (Population: 1,010,899)
  { id: 13, name: 'Whyte Ave Printing', lat: 53.5461, lng: -113.4938, address: '789 Whyte Ave, Edmonton, AB', specialty: 'Eco-Friendly', rating: 4.6 },
  { id: 14, name: 'North Saskatchewan Print', lat: 53.5444, lng: -113.4909, address: '321 Jasper Ave, Edmonton, AB', specialty: 'Large Format', rating: 4.7 },
  { id: 15, name: 'West Edmonton Print', lat: 53.5232, lng: -113.6250, address: '456 87th Ave, Edmonton, AB', specialty: 'Mall Services', rating: 4.4 },
  
  // Mississauga, ON (Population: 717,961)
  { id: 16, name: 'Square One Printing', lat: 43.5890, lng: -79.6441, address: '654 Hurontario St, Mississauga, ON', specialty: 'Business Solutions', rating: 4.8 },
  { id: 17, name: 'Port Credit Print', lat: 43.5448, lng: -79.5892, address: '123 Lakeshore Rd W, Mississauga, ON', specialty: 'Waterfront Designs', rating: 4.6 },
  
  // Winnipeg, MB (Population: 705,244)
  { id: 18, name: 'Portage Print Hub', lat: 49.8951, lng: -97.1384, address: '987 Portage Ave, Winnipeg, MB', specialty: 'T-Shirts & Hoodies', rating: 4.5 },
  { id: 19, name: 'Exchange District Print', lat: 49.8988, lng: -97.1372, address: '147 Main St, Winnipeg, MB', specialty: 'Vintage Designs', rating: 4.7 },
  { id: 20, name: 'Osborne Village Print', lat: 49.8844, lng: -97.1372, address: '258 Canada St, Winnipeg, MB', specialty: 'Trendy Apparel', rating: 4.6 },
  
  // Vancouver, BC (Population: 662,248)
  { id: 21, name: 'Granville Print Co.', lat: 49.2827, lng: -123.1207, address: '258 Granville St, Vancouver, BC', specialty: 'Sustainable Materials', rating: 4.9 },
  { id: 22, name: 'Gastown Printing', lat: 49.2845, lng: -123.1088, address: '369 Water St, Vancouver, BC', specialty: 'Premium Quality', rating: 4.8 },
  { id: 23, name: 'Commercial Drive Print', lat: 49.2606, lng: -123.0695, address: '741 Commercial Dr, Vancouver, BC', specialty: 'Custom Designs', rating: 4.6 },
  { id: 24, name: 'Kitsilano Print Studio', lat: 49.2688, lng: -123.1540, address: '852 4th Ave W, Vancouver, BC', specialty: 'Beach Lifestyle', rating: 4.7 },
  
  // Brampton, ON (Population: 656,480)
  { id: 25, name: 'Bramalea Print Solutions', lat: 43.7315, lng: -79.7624, address: '852 Main St N, Brampton, ON', specialty: 'Business Cards', rating: 4.4 },
  { id: 26, name: 'Heart Lake Print', lat: 43.7532, lng: -79.7624, address: '963 Bovaird Dr E, Brampton, ON', specialty: 'Community Events', rating: 4.5 },
  
  // Hamilton, ON (Population: 569,353)
  { id: 27, name: 'Steel City Printing', lat: 43.2557, lng: -79.8711, address: '963 King St E, Hamilton, ON', specialty: 'Industrial Printing', rating: 4.7 },
  { id: 28, name: 'Locke Street Print', lat: 43.2501, lng: -79.8711, address: '174 Locke St S, Hamilton, ON', specialty: 'Artisan Goods', rating: 4.8 },
  
  // Quebec City, QC (Population: 549,459)
  { id: 29, name: 'Vieux-Québec Print', lat: 46.8139, lng: -71.2080, address: '174 Rue Saint-Jean, Québec, QC', specialty: 'Heritage Designs', rating: 4.8 },
  { id: 30, name: 'Château Frontenac Printing', lat: 46.8118, lng: -71.2058, address: '285 Rue Saint-Louis, Québec, QC', specialty: 'Luxury Materials', rating: 4.9 },
  { id: 31, name: 'Sainte-Foy Print', lat: 46.7712, lng: -71.2946, address: '396 Chemin Sainte-Foy, Québec, QC', specialty: 'University Services', rating: 4.6 },
  
  // Surrey, BC (Population: 568,322)
  { id: 32, name: 'Fraser Valley Print', lat: 49.1913, lng: -122.8490, address: '396 King George Blvd, Surrey, BC', specialty: 'Large Format', rating: 4.5 },
  { id: 33, name: 'Guildford Print Centre', lat: 49.1867, lng: -122.8000, address: '507 152nd St, Surrey, BC', specialty: 'Shopping Centre', rating: 4.4 },
  
  // Laval, QC (Population: 438,366)
  { id: 34, name: 'Laval Print Express', lat: 45.6066, lng: -73.7124, address: '507 Boulevard Saint-Martin, Laval, QC', specialty: 'Quick Turnaround', rating: 4.6 },
  { id: 35, name: 'Centropolis Print', lat: 45.5598, lng: -73.7124, address: '618 Boulevard des Laurentides, Laval, QC', specialty: 'Entertainment District', rating: 4.5 },
  
  // Halifax, NS (Population: 439,819)
  { id: 36, name: 'Halifax Harbour Print', lat: 44.6488, lng: -63.5752, address: '618 Barrington St, Halifax, NS', specialty: 'Maritime Themes', rating: 4.7 },
  { id: 37, name: 'Spring Garden Printing', lat: 44.6426, lng: -63.5769, address: '729 Spring Garden Rd, Halifax, NS', specialty: 'Local Artists', rating: 4.8 },
  { id: 38, name: 'Dartmouth Print Co.', lat: 44.6820, lng: -63.5752, address: '830 Portland St, Dartmouth, NS', specialty: 'Waterfront Views', rating: 4.6 },
  
  // London, ON (Population: 422,324)
  { id: 39, name: 'Thames Valley Print', lat: 42.9849, lng: -81.2453, address: '830 Richmond St, London, ON', specialty: 'University Merch', rating: 4.6 },
  { id: 40, name: 'Covent Garden Print', lat: 42.9837, lng: -81.2497, address: '941 Dundas St, London, ON', specialty: 'Market District', rating: 4.7 },
  
  // Markham, ON (Population: 338,503)
  { id: 41, name: 'Markham Print Centre', lat: 43.8561, lng: -79.3370, address: '941 Highway 7, Markham, ON', specialty: 'Tech Company Swag', rating: 4.7 },
  { id: 42, name: 'Unionville Print Studio', lat: 43.8642, lng: -79.3111, address: '152 Main St Unionville, Markham, ON', specialty: 'Historic Village', rating: 4.8 },
  
  // Gatineau, QC (Population: 281,392)
  { id: 43, name: 'Outaouais Print Shop', lat: 45.4765, lng: -75.7013, address: '152 Boulevard Gréber, Gatineau, QC', specialty: 'Bilingual Services', rating: 4.5 },
  { id: 44, name: 'Hull Print Express', lat: 45.4286, lng: -75.7138, address: '263 Rue Montcalm, Gatineau, QC', specialty: 'Government Services', rating: 4.6 },
  
  // Saskatoon, SK (Population: 266,064)
  { id: 45, name: 'Prairie Print Co.', lat: 52.1579, lng: -106.6702, address: '263 2nd Ave S, Saskatoon, SK', specialty: 'Agricultural Themes', rating: 4.6 },
  { id: 46, name: 'Broadway Print Studio', lat: 52.1332, lng: -106.6700, address: '374 Broadway Ave, Saskatoon, SK', specialty: 'Arts District', rating: 4.7 },
  
  // Longueuil, QC (Population: 254,483)
  { id: 47, name: 'South Shore Printing', lat: 45.5312, lng: -73.5185, address: '374 Rue Saint-Charles, Longueuil, QC', specialty: 'Family Business', rating: 4.4 },
  { id: 48, name: 'Vieux-Longueuil Print', lat: 45.5372, lng: -73.5185, address: '485 Chemin de Chambly, Longueuil, QC', specialty: 'Historic Quarter', rating: 4.5 },
  
  // Burnaby, BC (Population: 249,125)
  { id: 49, name: 'Metrotown Print Hub', lat: 49.2237, lng: -122.9965, address: '485 Central Blvd, Burnaby, BC', specialty: 'Shopping Mall Kiosks', rating: 4.5 },
  { id: 50, name: 'Brentwood Print Centre', lat: 49.2667, lng: -123.0167, address: '596 Lougheed Hwy, Burnaby, BC', specialty: 'Transit Hub', rating: 4.4 },
  
  // Regina, SK (Population: 230,139)
  { id: 51, name: 'Queen City Print', lat: 50.4452, lng: -104.6189, address: '596 Victoria Ave, Regina, SK', specialty: 'Government Services', rating: 4.7 },
  { id: 52, name: 'Cathedral Print Studio', lat: 50.4515, lng: -104.6189, address: '607 13th Ave, Regina, SK', specialty: 'Historic District', rating: 4.6 },
  
  // Richmond, BC (Population: 209,937)
  { id: 53, name: 'Richmond Centre Print', lat: 49.1666, lng: -123.1336, address: '607 No. 3 Rd, Richmond, BC', specialty: 'Multicultural Designs', rating: 4.6 },
  { id: 54, name: 'Steveston Print Co.', lat: 49.1251, lng: -123.1336, address: '718 Moncton St, Richmond, BC', specialty: 'Fishing Village', rating: 4.7 },
  
  // Richmond Hill, ON (Population: 195,022)
  { id: 55, name: 'Richmond Hill Print', lat: 43.8828, lng: -79.4403, address: '829 Yonge St, Richmond Hill, ON', specialty: 'Suburban Services', rating: 4.5 },
  
  // Abbotsford, BC (Population: 153,524)
  { id: 56, name: 'Fraser Valley Print Co.', lat: 49.0504, lng: -122.3045, address: '940 South Fraser Way, Abbotsford, BC', specialty: 'Agricultural Community', rating: 4.6 },
  
  // Oakville, ON (Population: 213,759)
  { id: 57, name: 'Oakville Print Studio', lat: 43.4675, lng: -79.6877, address: '151 Lakeshore Rd E, Oakville, ON', specialty: 'Lakefront Luxury', rating: 4.8 },
  
  // St. Catharines, ON (Population: 140,370)
  { id: 58, name: 'Niagara Print Co.', lat: 43.1594, lng: -79.2469, address: '262 St. Paul St, St. Catharines, ON', specialty: 'Wine Country', rating: 4.7 },
  
  // Cambridge, ON (Population: 138,479)
  { id: 59, name: 'Grand River Print', lat: 43.3616, lng: -80.3144, address: '373 Hespeler Rd, Cambridge, ON', specialty: 'Tech Hub', rating: 4.6 },
  
  // Kingston, ON (Population: 132,485)
  { id: 60, name: 'Limestone City Print', lat: 44.2312, lng: -76.4860, address: '484 Princess St, Kingston, ON', specialty: 'University Town', rating: 4.7 },
  
  // Whitby, ON (Population: 138,501)
  { id: 61, name: 'Whitby Print Centre', lat: 43.8975, lng: -78.9429, address: '595 Dundas St W, Whitby, ON', specialty: 'Durham Region', rating: 4.5 },
  
  // Guelph, ON (Population: 131,794)
  { id: 62, name: 'Royal City Print', lat: 43.5448, lng: -80.2482, address: '606 Woolwich St, Guelph, ON', specialty: 'University Services', rating: 4.6 },
  
  // Kelowna, BC (Population: 144,576)
  { id: 63, name: 'Okanagan Print Co.', lat: 49.8880, lng: -119.4960, address: '717 Bernard Ave, Kelowna, BC', specialty: 'Wine & Tourism', rating: 4.8 },
  
  // Kitchener, ON (Population: 256,885)
  { id: 64, name: 'Waterloo Region Print', lat: 43.4516, lng: -80.4925, address: '828 King St W, Kitchener, ON', specialty: 'Tech Innovation', rating: 4.7 },
  
  // Windsor, ON (Population: 229,660)
  { id: 65, name: 'Border City Print', lat: 42.3149, lng: -83.0364, address: '939 Ouellette Ave, Windsor, ON', specialty: 'Automotive Industry', rating: 4.6 },
  
  // Vaughan, ON (Population: 323,103)
  { id: 66, name: 'Vaughan Mills Print', lat: 43.8361, lng: -79.5389, address: '150 Bass Pro Mills Dr, Vaughan, ON', specialty: 'Shopping Complex', rating: 4.5 },
  
  // Waterloo, ON (Population: 104,986)
  { id: 67, name: 'University Print Hub', lat: 43.4643, lng: -80.5204, address: '261 University Ave W, Waterloo, ON', specialty: 'Student Services', rating: 4.6 },
  
  // Coquitlam, BC (Population: 148,625)
  { id: 68, name: 'Tri-Cities Print', lat: 49.2838, lng: -122.7932, address: '372 North Rd, Coquitlam, BC', specialty: 'Family Community', rating: 4.5 },
  
  // Sudbury, ON (Population: 166,004)
  { id: 69, name: 'Nickel City Print', lat: 46.4917, lng: -80.9930, address: '483 Elm St, Sudbury, ON', specialty: 'Mining Heritage', rating: 4.6 },
  
  // Barrie, ON (Population: 147,829)
  { id: 70, name: 'Simcoe County Print', lat: 44.3894, lng: -79.6903, address: '594 Dunlop St E, Barrie, ON', specialty: 'Cottage Country', rating: 4.7 },
  
  // Oshawa, ON (Population: 166,000)
  { id: 71, name: 'Motor City Print', lat: 43.8971, lng: -78.8658, address: '705 Simcoe St S, Oshawa, ON', specialty: 'Automotive Heritage', rating: 4.5 },
  
  // St. John's, NL (Population: 114,677)
  { id: 72, name: 'Newfoundland Print Co.', lat: 47.5615, lng: -52.7126, address: '816 Water St, St. John\'s, NL', specialty: 'Atlantic Culture', rating: 4.8 },
  
  // Thunder Bay, ON (Population: 121,621)
  { id: 73, name: 'Lakehead Print Studio', lat: 48.3809, lng: -89.2477, address: '927 Red River Rd, Thunder Bay, ON', specialty: 'Northern Ontario', rating: 4.6 },
  
  // Sherbrooke, QC (Population: 172,950)
  { id: 74, name: 'Eastern Townships Print', lat: 45.4042, lng: -71.8929, address: '138 Rue Wellington N, Sherbrooke, QC', specialty: 'University Town', rating: 4.7 },
  
  // Saguenay, QC (Population: 144,746)
  { id: 75, name: 'Fjord Print Co.', lat: 48.4284, lng: -71.0570, address: '249 Rue Racine E, Chicoutimi, QC', specialty: 'Scenic Region', rating: 4.6 },
  
  // Lévis, QC (Population: 149,683)
  { id: 76, name: 'Chaudière Print', lat: 46.8067, lng: -71.1772, address: '360 Rue Président-Kennedy, Lévis, QC', specialty: 'South Shore', rating: 4.5 },
  
  // Trois-Rivières, QC (Population: 139,163)
  { id: 77, name: 'Mauricie Print Studio', lat: 46.3432, lng: -72.5477, address: '471 Rue des Forges, Trois-Rivières, QC', specialty: 'Historic City', rating: 4.6 },
  
  // Terrebonne, QC (Population: 119,944)
  { id: 78, name: 'North Shore Print', lat: 45.7051, lng: -73.6470, address: '582 Boulevard des Seigneurs, Terrebonne, QC', specialty: 'Suburban Family', rating: 4.4 },
  
  // Milton, ON (Population: 132,079)
  { id: 79, name: 'Escarpment Print', lat: 43.5183, lng: -79.8774, address: '693 Main St E, Milton, ON', specialty: 'Growing Community', rating: 4.5 },
  
  // Moncton, NB (Population: 79,470)
  { id: 80, name: 'Hub City Print', lat: 46.0878, lng: -64.7782, address: '804 Main St, Moncton, NB', specialty: 'Maritime Hub', rating: 4.7 },
  
  // Brantford, ON (Population: 104,688)
  { id: 81, name: 'Grand River Valley Print', lat: 43.1394, lng: -80.2644, address: '915 Colborne St, Brantford, ON', specialty: 'Historic Telephone City', rating: 4.6 },
  
  // Saint-Jean-sur-Richelieu, QC (Population: 98,036)
  { id: 82, name: 'Richelieu Print Co.', lat: 45.3075, lng: -73.2625, address: '126 Rue Saint-Jacques, Saint-Jean-sur-Richelieu, QC', specialty: 'Balloon Festival', rating: 4.5 },
  
  // Repentigny, QC (Population: 84,965)
  { id: 83, name: 'Lanaudière Print', lat: 45.7420, lng: -73.4500, address: '237 Rue Notre-Dame, Repentigny, QC', specialty: 'Riverside Community', rating: 4.4 },
  
  // Lethbridge, AB (Population: 101,482)
  { id: 84, name: 'Chinook Print Studio', lat: 49.6934, lng: -112.8414, address: '348 5th St S, Lethbridge, AB', specialty: 'Prairie Winds', rating: 4.6 },
  
  // Nanaimo, BC (Population: 99,863)
  { id: 85, name: 'Harbour City Print', lat: 49.1659, lng: -123.9401, address: '459 Fitzwilliam St, Nanaimo, BC', specialty: 'Island Life', rating: 4.7 },
  
  // Sarnia, ON (Population: 95,077)
  { id: 86, name: 'Chemical Valley Print', lat: 42.9994, lng: -82.3089, address: '570 Christina St N, Sarnia, ON', specialty: 'Industrial Heritage', rating: 4.5 },
  
  // Kamloops, BC (Population: 97,902)
  { id: 87, name: 'Tournament Capital Print', lat: 50.6745, lng: -120.3273, address: '681 Columbia St, Kamloops, BC', specialty: 'Sports Tourism', rating: 4.6 },
  
  // Châteauguay, QC (Population: 50,815)
  { id: 88, name: 'Châteauguay Print', lat: 45.3647, lng: -73.7527, address: '792 Boulevard Saint-Jean-Baptiste, Châteauguay, QC', specialty: 'Suburban Montreal', rating: 4.4 },
  
  // Red Deer, AB (Population: 103,690)
  { id: 89, name: 'Central Alberta Print', lat: 52.2681, lng: -113.8112, address: '903 Gaetz Ave, Red Deer, AB', specialty: 'Central Location', rating: 4.5 },
  
  // Drummondville, QC (Population: 79,258)
  { id: 90, name: 'Centre-du-Québec Print', lat: 45.8839, lng: -72.4819, address: '114 Rue Hériot, Drummondville, QC', specialty: 'Textile Heritage', rating: 4.6 },
  
  // Fort McMurray, AB (Population: 72,917)
  { id: 91, name: 'Oil Sands Print Co.', lat: 56.7267, lng: -111.3790, address: '225 Hardin St, Fort McMurray, AB', specialty: 'Resource Industry', rating: 4.7 },
  
  // Granby, QC (Population: 66,222)
  { id: 92, name: 'Granby Print Studio', lat: 45.4036, lng: -72.7342, address: '336 Rue Principale, Granby, QC', specialty: 'Zoo City', rating: 4.5 },
  
  // Medicine Hat, AB (Population: 63,271)
  { id: 93, name: 'Gas City Print', lat: 50.0395, lng: -110.6764, address: '447 3rd St SE, Medicine Hat, AB', specialty: 'Natural Gas Heritage', rating: 4.6 },
  
  // Saint-Hyacinthe, QC (Population: 55,823)
  { id: 94, name: 'Maskoutains Print', lat: 45.6306, lng: -72.9575, address: '558 Avenue Saint-Simon, Saint-Hyacinthe, QC', specialty: 'Agricultural Technology', rating: 4.4 },
  
  // Brossard, QC (Population: 91,525)
  { id: 95, name: 'Quartier DIX30 Print', lat: 45.4504, lng: -73.4656, address: '669 Boulevard Taschereau, Brossard, QC', specialty: 'Shopping District', rating: 4.5 },
  
  // Shawinigan, QC (Population: 49,349)
  { id: 96, name: 'Mauricie Valley Print', lat: 46.5667, lng: -72.7500, address: '770 5e Rue, Shawinigan, QC', specialty: 'Hydroelectric Heritage', rating: 4.6 },
  
  // Dollard-des-Ormeaux, QC (Population: 49,637)
  { id: 97, name: 'West Island Print', lat: 45.4942, lng: -73.7947, address: '881 Tecumseh Rd, Dollard-des-Ormeaux, QC', specialty: 'Suburban Services', rating: 4.4 },
  
  // Blainville, QC (Population: 56,863)
  { id: 98, name: 'Laurentides Print Co.', lat: 45.6689, lng: -73.8814, address: '992 Boulevard du Curé-Labelle, Blainville, QC', specialty: 'North Shore', rating: 4.5 },
  
  // Saint-Eustache, QC (Population: 44,154)
  { id: 99, name: 'Deux-Montagnes Print', lat: 45.5653, lng: -73.9058, address: '103 Rue Saint-Eustache, Saint-Eustache, QC', specialty: 'Historic Town', rating: 4.6 },
  
  // Rimouski, QC (Population: 48,664)
  { id: 100, name: 'Bas-Saint-Laurent Print', lat: 48.4489, lng: -68.5361, address: '214 Avenue de la Cathédrale, Rimouski, QC', specialty: 'Maritime Culture', rating: 4.7 }
];