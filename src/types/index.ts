import { SetStateAction, Dispatch, ChangeEvent } from "react";
export interface InitialStateType {
  currentSongs: any[];
  currentIndex: number;
  isActive: boolean;
  isPlaying: boolean;
  activeSong: Record<string, any>;
  genreListId: string;
}
export interface SongsType {
  artists: [{ adamid: string; alias: string; id: string }];
  highlightsurls: {
    artisthighlightsurl: string;
    trackhighlighturl: string;
  };
  hub: {
    actions: [
      { id: string; name: string; type: string },

      {
        name: string;
        type: string;

        uri: string;
      }
    ];
    displayname: string;
    explicit: boolean;
    image: string;
    options: [
      {
        actions: [
          {
            name: string;
            type: string;
            uri: string;
          },
          {
            name: string;
            type: string;
            uri: string;
          }
        ];
        beacondata: { providername: string; type: string };
        caption: string;
        colouroverflowimage: boolean;
        image: string;
        listcaption: string;
        overflowimage: string;
        providername: string;
        type: string;
      }
    ];
    type: string;
  };
  images: {
    background: string;
    coverart: string;
    coverarthq: string;
    joecolor: string;
  };
  key: string;
  layout: string;
  properties: {};
  share: {
    avatar: string;
    href: string;
    html: string;
    image: string;
    snapchat: string;
    subject: string;
    text: string;
    twitter: string;
  };
  subtitle: string;
  title: string;
  type: string;
  url: string;
}

export interface TopSongsArtist {
  attributes: {
    albumName: string;
    artistName: string;
    artwork: {
      bgColor: string;
      hasP3: boolean;
      height: number;
      textColor1: string;
      textColor2: string;
      textColor3: string;
      textColor4: string;
      url: string;
      width: number;
    };
    audioLocale: string;
    audioTraits: string[];
    composerName: string;
    contentRating: string;
    discNumber: number;
    durationInMillis: number;
    genreNames: string[];
    hasCredits: boolean;
    hasLyrics: boolean;
    hasTimeSyncedLyrics: boolean;
    isAppleDigitalMaster: boolean;
    isMasteredForItunes: boolean;
    isVocalAttenuationAllowed: boolean;
    isrc: string;
    name: string;
    playParams: {
      id: string;
      kind: string;
    };
    previews: {
      url: string;
    }[];
    releaseDate: string;
    trackNumber: number;
    url: string;
  };
  href: string;
  id: string;
  type: string;
}
export interface SearchSongsType {
  actions: Array<{
    id: string;
    name: string;
    type: string;
  }>;
  alias: string;
  artists: Array<{
    adamid: string;
    alias: string;
    id: string;
  }>;
  heading: {
    subtitle: string;
    title: string;
  };
  images: {
    blurred: string;
    default: string;
    play: string;
  };
  key: string;
  share: {
    avatar: string;
    href: string;
    html: string;
    image: string;
    snapchat: string;
    subject: string;
    text: string;
    twitter: string;
  };
  stores: {
    apple: {
      actions: Array<{
        type: string;
        uri: string;
      }>;
      coverarturl: string;
      explicit: boolean;
      previewurl: string;
      productid: string;
      trackid: string;
    };
  };
  streams: {};
  type: string;
  url: string;
  urlparams: {
    "{trackartist}": string;
    "{tracktitle}": string;
  };
}

export interface DetailsArtistType {
  attributes: {
    artwork: {
      bgColor: string;
      hasP3: boolean;
      height: number;
      textColor1: string;
      textColor2: string;
      textColor3: string;
      textColor4: string;
      url: string;
      width: number;
    };
    genreNames: string[];
    name: string;
    url: string;
  };
  href: string;
  id: string;
  relationships: {
    albums: {
      data: Array<{
        href: string;
        id: string;
        type: string;
      }>;
      href: string;
      next: string;
    };
  };
  type: string;
}

export interface PlayPausetype {
  isPlaying: boolean;
  activeSong: Record<string, any>;
  song: Record<string, any>;
  handlePause: Function;
  handlePlay: Function;
}

export interface TopChartCardType {
  song: Record<string, any>;
  i: number;
  isPlaying: boolean;
  activeSong: Record<string, any>;
  handlePauseClick: Function;
  handlePlayClick: Function;
}

export interface SongBarType {
  song: Record<string, any>;
  i: number;
  artistId: string;
  isPlaying: boolean;
  activeSong: Record<string, any>;
  handlePauseClick: Function;
  handlePlayClick: Function;
}

export interface DetailsHeaderType {
  artistId?: string | any;
  artistData?: any;
  songData?: any;
}

export interface ControlsType {
  isPlaying: boolean;
  repeat: boolean;
  setRepeat: Dispatch<SetStateAction<boolean>>;
  shuffle: boolean;
  setShuffle: Dispatch<SetStateAction<boolean>>;
  currentSongs: any;
  handlePlayPause: Function;
  handlePrevSong: Function;
  handleNextSong: Function;
}

export interface TrackType {
  isPlaying: boolean;
  isActive: boolean;
  activeSong: any;
}

export interface SeekBarType {
  value: number;
  min: string;
  max: number;
  onInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setSeekTime: Dispatch<SetStateAction<number>>;
  appTime: number;
}

export interface Playertype {
  activeSong: any;
  isPlaying: boolean;
  volume: number;
  seekTime: number;
  onEnded: Function;
  onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
  repeat: boolean;
}

export interface VolumeBartype {
  value: number;
  min: "0";
  max: "1";
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  setVolume: Dispatch<SetStateAction<number>>;
}
export interface SongCardType {
  song: any;
  i: number;
  isPlaying: boolean;
  activeSong: Record<string, any>;
  data: TopSongsArtist | SearchSongsType | SongsType;
}
