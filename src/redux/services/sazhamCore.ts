import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const limit = "3";
export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "6cb95e0efcmsha6a2abcc93591cbp196236jsn58dbfc0ee5ec"
      );
      headers.set("X-RapidAPI-Host", "shazam-api7.p.rapidapi.com");
    },
  }),
  endpoints: (builder) => ({
    getTopCart: builder.query({
      query: () => "/charts/get-top-songs-in-world",
    }),
    getSearchSongs: builder.query({
      query: (query) => `/search?term=${query}&limit=${limit}`,
    }),
    getSongsByGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=${limit}`,
    }),
    getDetailsSong: builder.query({
      query: (id) => `/songs/get_details?id=${id}`,
    }),
    getRecommendations: builder.query({
      query: (id) => `/songs/list-recommendations?id=${id}&limit=${limit}`,
    }),
    getArtistDetails: builder.query({
      query: (id) => `/artist/get-details?id=${id}`,
    }),
    getTopSongsArtist: builder.query({
      query: (id) => `/artist/get-top-songs?id=${id}&offset=0`,
    }),
    getTopSongsCoutryByGenre: builder.query({
      query: (country) =>
        `/charts/get-top-songs-in_country_by_genre?country_code=${country}&genre=POP&limit=${limit}`,
    }),
  }),
});

export const {
  useGetTopCartQuery,
  useGetSongsByGenreQuery,
  useGetDetailsSongQuery,
  useGetRecommendationsQuery,
  useGetArtistDetailsQuery,
  useGetTopSongsArtistQuery,
  useGetTopSongsCoutryByGenreQuery,
  useGetSearchSongsQuery,
} = shazamApi;
