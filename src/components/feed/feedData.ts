export const feedData = [{
  id: 1,
  user: 1,
  date: 'One hour ago',
  rating: 4,
  images: ['https://eatforum.org/content/uploads/2018/05/table_with_food_top_view_900x700.jpg'],
  location: 'Restaurant, Maui, Hawaii 🇿🇼',
  comment: 'Simple, cheap and very tasty Chinese food. Great menu with a wide variety of dishes to choose from all at a very reasonable price! Also extremely nice staff and great service! Very glad I ate here and definitely would come back!! Highly Recommended!',
  price: '$ 92.13',
},
{
  id: 2,
  user: 2,
  date: '8 hours ago',
  rating: 5,
  images: ['https://static.toiimg.com/photo/72023714.cms'],
  location: 'Restaurant, Cebu, Philippines 🇲🇩',
  comment: 'Good meat, was a little pricy. But overall a great place to have dinner, will come back. Always busy, better book in advance. Staff good, could improve.',
  price: '$ 35.12'
},
{
  id: 3,
  user: 3,
  date: '23 March 2020',
  rating: 4,
  images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg'],
  location: 'Restaurant, Mexico, Mexico 🇸🇾',
  comment: 'Good Japanese BBQ. The meat is really good, juicy and tasty. Order four side dishes and get one free. Staff are friendly. We had five people spent around $170around. Recommend to everyone.',
  price: '$ 124.2'
},
{
  id: 4,
  user: 4,
  date: '23 March 2020',
  rating: 4,
  images: ['https://media.timeout.com/images/105324246/image.jpg'],
  location: 'Restaurant, Hanoi, Vietnam 🇿🇼',
  comment: 'Authentic Japanese yakiniku. Nice place. People queue up before it’s opening. Lunch special is good value.',
  price: '$ 35.00'
},
{
  id: 5,
  user: 5,
  date: '22 March 2020',
  rating: 4,
  images: ['https://manofmany.com/wp-content/uploads/2019/02/12-Best-Korean-BBQ-Restaurants-in-Sydney-Sydney-Madang.jpg'],
  location: 'Restaurant, Bangkok, Thailand 🇾🇪',
  comment: `Had an enjoyable meal at Yakiniku Yokocho. The meat was very tasty and delicious. We ordered 3 small portions of meats and one side + large rice to share between 2 people. With beer $65 in total. It was perfect for us. Highly recommend the Boneless Beef Rib and Pork Neck. Not so much the outskirt which was in comparison more chewy. 

  It’s a cozy little place and staff was very attentive and fast with service. If you go rush hour might need to wait. It is very popular. 
  
  The place does get a bit smokey when it’s full, the ventilation tubes weren’t as effective as it should be.
  
  We will surely return, this looks to be a keeper and an awesome regular spot to eat.
  
  Note that the BBQ is with gas not charcoal. And 90 mins meal time limit, which was more than enough for us.`,
  price: '$ 182.50'
},
{
  id: 6,
  user: 6,
  date: '22 March 2020',
  rating: 3,
  images: ['https://www.afamilyfeast.com/wp-content/uploads/2018/06/Buttermilk-Fried-Chicken-2.jpg'],
  location: 'KFC, Sydney, Australia 🇲🇺',
  comment: 'Only had lunch special there but quality and portion was good. Steak sirloin were tender and tasty. Really loved the boiled Motsuni dish (boiled beef innards).  Great flavor and cooked to perfection. Will definitely come back to try the Yakiniku.',
  price: '$ 24.00'
}]

export const places = [{
  id: 0,
  foursquareId: ''
}]

export const feedFavouriteList = [{
  id: 1,
  name: 'San Francisco, CA, USA',
  flag: 'https://image.shutterstock.com/image-illustration/usa-flag-form-glossy-icon-260nw-121069288.jpg'
},
{
  id: 2,
  name: 'Milan, Italy',
  flag: 'https://i1.wp.com/www.anglotopia.net/wp-content/uploads/2014/08/800px-Flag_of_the_United_Kingdom.svg_-590x2951.png?resize=350%2C200&ssl=1'
},
{
  id: 3,
  name: 'Sydney, Australia',
  flag: 'https://i1.wp.com/www.anglotopia.net/wp-content/uploads/2014/08/800px-Flag_of_the_United_Kingdom.svg_-590x2951.png?resize=350%2C200&ssl=1'
}]

export const followers = [{
  user: 1,
  followers: [2, 3, 4, 5]
}]

export const getUser = (id: number) => {
  return users.filter(user => user.id === id)[0]
}
export const users = [{
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUjq0XE8pThShbmQZCK8mCV4dwi49jJ3rvm_fuC20fOWg8amVJ',
  name: 'Sebastian Go',
  id: 1
},
{
  avatar: 'https://evimso.com/wp-content/uploads/2018/05/user-avatar-1.png',
  name: 'Katy Perry',
  id: 2
},
{
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4xuqkWrVQuU_xYxv7I9y9wiM1KZmXV78jcl5-jORkxco9g8Mu',
  name: 'James Jonathan Fernando',
  id: 3
},
{
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUjq0XE8pThShbmQZCK8mCV4dwi49jJ3rvm_fuC20fOWg8amVJ',
  name: 'Bruce Willis',
  id: 4
},
{
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUjq0XE8pThShbmQZCK8mCV4dwi49jJ3rvm_fuC20fOWg8amVJ',
  name: 'Stephanie Cameron',
  id: 5
},
{
  avatar: 'https://evimso.com/wp-content/uploads/2018/05/user-avatar-1.png',
  name: 'Alex James Grace Co',
  id: 6
}]

export const testVenue = {
  "id": "5b35eb6de179100039e987b4",
  "name": "Yakiniku Yokocho",
  "contact": {
    "phone": "0292613131"
  },
  "location": {
    "address": "Regent Place",
    "crossStreet": "Level 9, 487-501 George St.",
    "lat": -33.87474644263438,
    "lng": 151.20629683720998,
    "labeledLatLngs": [],
    "postalCode": "2000",
    "cc": "AU",
    "city": "Sydney",
    "state": "NSW",
    "country": "Australia",
    "formattedAddress": [
      "Regent Place (Level 9, 487-501 George St.)",
      "Sydney NSW 2000"
    ]
  },
  "description": "Located in the heart of the Sydney CBD, Yakiniku Yokocho is a restaurant that reflects the Japanese night life culture of eating, drinking and hanging out in narrow lanes in the midst a bustling city.",
  "hours": {
    "status": "Closed until 5:00 PM",
    "timeframes": [
      {
      "days": "Mon–Thu, Sun",
      "open": [{
        "renderedTime": "5:00 PM–10:00 PM"
      }]
      },
      {
        "days": "Fri–Sat",
        "open": [{
          "renderedTime": "5:00 PM–11:30 PM"
        }]
    }]
  }
}

/*
- How many persons
- notes
- recommendation
*/