/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
const contents = [
  {
    id: 1,
    title: 'Stranger Things',
    image: 'https://twimglevel3.cdnar.net/contents/92e39f50-ceda-4142-9111-a1991c04103c_DayBreakers/thumbnails/tv.jpg',
  },
  {
    id: 2,
    title: 'Deadpool 2',
    image: 'https://twimglevel3.cdnar.net/contents/89042256-2a64-433f-94d9-493f1943a24b_LaAdorableRevoltosa/thumbnails/tv.jpg',
  },
  {
    id: 3,
    title: 'Mean Girls',
    image: 'https://twimglevel3.cdnar.net/contents/4552eee2-36a2-4473-b17b-7f2eef2df2a6_RedRiver/thumbnails/tv.jpg',
  },
  {
    id: 4,
    title: 'Moonlight',
    image: 'https://twimglevel3.cdnar.net/contents/098cce16-8864-49ea-9f8d-75d7f656021a_HorseFeathers1932/thumbnails/tv.jpg',
  },
  {
    id: 5,
    title: 'Mr Bean',
    image: 'https://twimglevel3.cdnar.net/contents/0a2c4a71-9808-4823-970a-68da37b9fc2e_MonkeyBusiness1931/thumbnails/tv.jpg',
  },
  {
    id: 6,
    title: 'Whitehouse',
    image: 'https://twimglevel3.cdnar.net/contents/baf04745-f15a-43c4-b9c1-69da26db2d15_ElTercerHombre/thumbnails/tv.jpg',
  },
  {
    id: 7,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/08c4eebe-b41f-4643-b3d3-388ec2fec9c6_ElPlanetaDesconocido/thumbnails/tv.jpg',
  },
  {
    id: 8,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0a63b8e9-e969-4c47-8932-01ef6bf983d3_AFistfulOfDollars1964/thumbnails/tv.jpg',
  },
  {
    id: 9,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0c0b2b19-9c5a-4373-b9d2-bd0754ea6f8c_TheDiscreetCharmOfTheBourgeoisie1972/thumbnails/tv.jpg',
  },
  {
    id: 10,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0c0c261d-34ca-4b42-bbff-ca994134108f_DanceOfTheVampires1967/thumbnails/tv.jpg',
  },
  {
    id: 11,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0c0c261d-c885-4e43-90d8-5a13252234dd_Help1965/thumbnails/tv.jpg',
  },
  {
    id: 12,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0e0d1099-8e7d-485e-b534-36d1e3ea6ccb_TheBellboy1960/thumbnails/tv.jpg',
  },
  {
    id: 13,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0e2b6049-97f5-499b-8c11-e7a032876a5d_AguirreTheWrathOfGod1972/thumbnails/tv.jpg',
  },
  {
    id: 14,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0dfabb3d-d6df-4004-bc89-2479b155911b_CatPeople1942/thumbnails/tv.jpg',
  },
  {
    id: 15,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0e9a4172-b394-491b-918c-93268cfea7bc_LateSpring1949/thumbnails/tv.jpg',
  },
  {
    id: 16,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0e9a4172-b0b1-43fa-a137-bae18c9e92ac_TokyoStory1953/thumbnails/tv.jpg',
  },
  {
    id: 17,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/11f7432d-3e4f-40b6-bec2-396d452d9c80_GeorgeWashington2000/thumbnails/tv.jpg',
  },
  {
    id: 18,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0e752f5d-f804-42ef-86e7-60d989040511_LAvenir2016/thumbnails/tv.jpg',
  },
  {
    id: 19,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0c0c261d-c885-4e43-90d8-5a13252234dd_Help1965/thumbnails/tv.jpg',
  },
  {
    id: 20,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0ec84bed-ff35-471d-b528-af240c91d2fd_WinterSleep2014/thumbnails/tv.jpg',
  },
  {
    id: 21,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/c4cc3fc7-3a05-4b20-9491-b6afc2f705ee_ElOso/thumbnails/tv.jpg',
  },
  {
    id: 22,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/095d997a-52c6-480e-ae4c-75a9ea5ead31_TheKillingFields1984/thumbnails/tv.jpg',
  },
  {
    id: 23,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/c3ba26e0-1b85-4015-bb95-60a1745787b0_DueloAlSol/thumbnails/tv.jpg',
  },
  {
    id: 24,
    title: 'Jaws',
    image: 'https://twimglevel3.cdnar.net/contents/0c0c261d-c885-4e43-90d8-5a13252234dd_Help1965/thumbnails/tv.jpg',
  },
  {
    id: 25,
    title: 'Stranger Things',
    image: 'https://static.wikia.nocookie.net/marveldatabase/images/a/ae/Venom_%28film%29_poster_009.jpg',
  }
];

const actores = [
  {
    id: 1,
    title: 'Jaws',
    image: 'https://assets.cdnar.net/qubit/images_people/staging/jeremy-irons-profile-w8Ct1q02Ht3sWdOSqfp3B85TzT.jpg',
  },
  {
    id: 2,
    title: 'Jaws',
    image: 'https://assets.cdnar.net/qubit/images_people/staging/dominique-swain-profile-aIj6HKeFk9hWlkMaO4tQN28TxBk.jpg',
  },
  {
    id: 3,
    title: 'Jaws',
    image: 'https://assets.cdnar.net/qubit/images_people/staging/melanie-griffith-profile-yffPcqlZMsXTCAZ84a1tLmdcIS6.jpg',
  },
  {
    id: 4,
    title: 'Jaws',
    image: 'https://assets.cdnar.net/qubit/images_people/staging/frank-langella-profile-2Q0FS8YF74u4uWzFy0NlVhZ4Smb.jpg',
  },
  {
    id: 5,
    title: 'Jaws',
    image: 'https://assets.cdnar.net/qubit/images_people/staging/suzanne-shepherd-profile-7trwhBrNHhH2STDxMrDeqUqZf42.jpg',
  }
];

  export default {
    contents,
    actores
  }
