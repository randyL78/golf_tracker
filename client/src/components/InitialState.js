// static data
export default {
  // screen size state to adjust layout by
  screenSize: 'small',

  // state for managing course routes

  // state for managing round routes
  currentRound: {},
  isInARound: false,


  // eventually, data from the server
  // for now static data
  data: {
    courses: [
      {
        id: "1",
        name: 'Poplar Forest',
        address: '123 Bramblewood Pl',
        city: 'Lynchburg',
        state: 'VA'
      },
      {
        id: "2",
        name: 'Boonsboro Country Club',
        address: '123 Bramblewood Pl',
        city: 'Lynchburg',
        state: 'VA'
      },
      {
        id: "3",
        name: 'Poplar Grove',
        address: '123 Bramblewood Pl',
        city: 'Lynchburg',
        state: 'VA'
      },
      {
        id: "4",
        name: 'Colonial Downs',
        address: '123 Bramblewood Pl',
        city: 'Lynchburg',
        state: 'VA'
      }
    ],
    rounds: [],
  }
}