import React, { useRef, useState, useEffect } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui.js';

import router from '../../Router';
import { redux, api, session, capitalize, slug } from '../../services';

import * as data from '../../api_gateway/static';
import * as models from '../../api_gateway/models';

import styles from './Player.css';


//Uso esta varibla para acceder desde los Hooks y no tener que montarlos por cada cambio,
var state_player = {};

const tracker = (type, info) => {

  const { userId, activeProfileId } = state_player.session;

  window.TrackerQb({
    type: 'player-' + type,
    user_id: userId || null,
    profile_id: activeProfileId || null,
    ...info
  });
};

function Player({ model }) {

  const [load, setLoad] = useState(false);

  const videoComponent = useRef();

  const videoContainer = useRef();

  //Ya existe cargado un model desde function Content(), solo hago un refresh
  state_player.model = model;

  const { content, id } = model;

  state_player.playback_id = id;

  state_player.uuid = content.uuid;

  state_player.title = content.title;

  state_player.manifestUri = model.cdn.dash;

  useEffect(() => {

    state_player.session = redux.get('session').status;

    shaka.polyfill.installAll();

    if (!shaka.Player.isBrowserSupported()) {
      tracker('error', { message: 'unsupported browser' });
      router('/inicio');
    }

    //Getting reference to video and video container on DOM
    var video = videoComponent.current;

    state_player.videoContainer = videoContainer.current;

    // Initialize shaka player
    // Attach the player to the window so that it can be easily debugged.
    window.player = new shaka.Player(video);

    //var cast = new shaka.cast.CastProxy(video, window.player, 'B472DF20');

    //Setting UI configuration JSON object
    const uiConfig = {
      //Configuring elements to be displayed on video player control panel
      controlPanelElements: [
        'mute',
        'volume',
        'time_and_duration',
        'fullscreen',
        'overflow_menu',
        'play_pause',
      ],
      overflowMenuButtons: ['cast'],
      'seekBarColors': {
        played: 'rgb(255, 162, 0)',
      },
      volumeBarColors: {
        level: 'rgb(255, 162, 0)',
      },
    };

    //Setting up shaka player UI
    const ui = new shaka.ui.Overlay(window.player, state_player.videoContainer, video);
    ui.configure(uiConfig); //configure UI

    events_shaka('add', video, state_player.model);
    events_html('add');

    window.player.load(state_player.manifestUri).then(function () {
      setLoad(true);
      containerSubtitle('init');
      //console.log('The video has now been loaded!');
    }).catch(onError);

    return () => {
      events_shaka('remove');
      events_html('remove');
    };
  }, []);

  return (
    <div className="video-container" ref={videoContainer}>
      <Header content={content} />
      <Info content={content} />
      <Languages load={load} />
      <ConfigSubtitles load={load} />
      <ReplayForward />
      <Thumbnail />
      <video className="shaka-video" ref={videoComponent} poster={content.poster} autoPlay={true} />
    </div>
  );
}

const Header = ({ content }) =>
  <div className="element-header">
    <button className="on-back material-icons-round">arrow_back</button>
    <div>
      <h1>{state_player.title}</h1>
      {!content.rating ? null :
        <h2>
          <img src="/favicon-qubit.png" alt="Qubit" />
          {content.rating.name_short}
          <span> {content.rating.name}</span>
        </h2>
      }
    </div>
  </div>;

const Info = ({ content }) =>
  <div className="element-info">
    <div className="content">
      <h2>Estás viendo</h2>
      {content.imgtv ? <img src={content.imgtv} alt={state_player.title} /> : null}
      <h1>{state_player.title}</h1>
      <strong>{content.summary_short}</strong>
    </div>
  </div>;

const ReplayForward = () =>
  <div className="element-replay-forward">
    <button className="on-replay material-icons-round">replay_10</button>
    <button className="on-forward material-icons-round">forward_10</button>
  </div>;

const Thumbnail = () =>
  <div className="thumbnail-container">
    <div className="minutes"></div>
  </div>;


const ConfigSubtitles = ({ load }) => {

  const [update, setUpdate] = useState(false);

  var size = state_player.size || 's5';
  var appearance = state_player.appearance || 'a3';

  const onChange = (type, value) => {
    state_player[type] = value;
    containerSubtitle('change');
    setUpdate(!update);
  };

  const onClose = () => {
    onHtmlEvent({ type: 'on-scrim' });
    state_player.config_subtitles = false;
    onHtmlEvent({ type: 'on-config-subtitles' });
  };

  return (
    <div className="element-configuration">
      <div className="element-configuration-subtitles">
        <h1>Configuración de subtítulos</h1>
        <i className="material-icons-round" onClick={() => onClose()}>close</i>
        <div className="size">
          <p>Tamaño</p>
          <div>
            {[1, 2, 3, 4, 5].map((item, key) => <div key={key} onClick={() => onChange('size', 's' + item)}><h2 className={'s' + item} active={size}>Qb</h2></div>)}
          </div>
        </div>
        <div className="appearance">
          <p>Aspecto</p>
          <div>
            {[1, 2, 3, 4, 5, 6].map((item, key) => <div key={key} onClick={() => onChange('appearance', 'a' + item)}><h2 className={'a' + item} active={appearance}>Qb</h2></div>)}
          </div>
        </div>
      </div>
      <div className={'example-subtitles ' + size + ' ' + appearance}>
        Este es un ejemplo de subtítulos.
      </div>
    </div>
  );
};

var audios = [];
var subtitles = [];
const Languages = ({ load }) => {

  const [update, setUpdate] = useState(false);
  const onConfigSubtitles = () => {
    onHtmlEvent({ type: 'on-scrim' });
    state_player.config_subtitles = true;
    onHtmlEvent({ type: 'on-config-subtitles' });
  };
  const onClick = (type, { active, slug }) => {

    if (active) return null;

    if (type === 'audios') {
      audios.forEach((row, key) => audios[key].active = (slug === row.slug));
      window.player.selectAudioLanguage(slug);
      onPlayback({ language: slug });
    }
    else {
      subtitles.forEach((row, key) => subtitles[key].active = (slug === row.slug));
      if (slug === 'disabled') {
        window.player.setTextTrackVisibility(false);
        onPlayback({ subtitle: null });
      } else {
        window.player.setTextTrackVisibility(true);
        window.player.selectTextLanguage(slug);
        onPlayback({ subtitle: slug });
      }
    }
    setUpdate(!update);

    if (state_player.language_timer) clearTimeout(state_player.language_timer);

    state_player.language_timer = setTimeout(() => onHtmlEvent({ type: 'on-scrim' }), 3000);
  };

  useEffect(() => {
    audios = [];
    subtitles = [];

    if (load) {
      var local;
      const { audio_tracks, /*audio_default,*/ subtitle_tracks } = state_player.model.content;

      const getLocal = local => {
        if (local) local.name = capitalize(local.name);
        else local = { slug: 'error', name: '"NO" Reconocido' };

        return local;
      };

      var { language } = window.player.getVariantTracks().find(item => item.active === true);

      audio_tracks.forEach((audio, key) => {
        if (language === 'und' && key === 0) language = audio;
        local = data.audios.find(item => item.slug === audio);

        if (local === undefined) {
          tracker('error', { code: '404', message: 'audio no detectado' });
        }
        else {
          local.active = (audio === language);
        }
        audios.push(getLocal(local));
      });

      const visible = window.player.isTextTrackVisible();

      if (subtitle_tracks !== '' && subtitle_tracks !== null) {
        local = data.audios.find(item => item.slug === subtitle_tracks);
        subtitles.push({ ...getLocal(local), active: visible });
      }
      subtitles.push({ slug: 'disabled', name: 'Sin Subtitulos', active: !visible });

      setUpdate(true);
    }

  }, [load]);

  const Element = ({ name, title, data, icon }) =>
    <div className={name}>
      <div className="title">
        <i className="material-icons-round">{icon}</i>
        <span>{title}</span>
      </div>
      <div className="data">
        {data.map((item, key) => {
          const active = item.active ? 'done' : '';
          return <div key={key} className={active} onClick={() => onClick(name, item)}>
            <span>{item.name}</span>
            <i className={'material-icons-round ' + active}>{active}</i>
          </div>;
        })}
      </div>
      {(name === 'subtitles' && data.length > 1) ?
        <div className="configuration" onClick={() => onConfigSubtitles()}>
          Configuración
          <i className="material-icons-round"></i>
        </div>
        : null}
    </div>;

  return (
    <div className="element-languages">
      <Element name="audios" title="Audios" data={audios} icon="language" />
      <Element name="subtitles" title="Subtitulos" data={subtitles} icon="closed_caption" />
      <div className="icon material-icons-round">flash_on</div>
    </div>
  );
};

//Esta funcion es la usada para llamar al player
async function init(uuid) {
  await api('play', null, { uuid: uuid });
  redux.push('play_uuid', uuid, true);
  router('/play');
}

function Content({ history }) {

  const [model, setModel] = useState({
    load: false,
    id: null,
    cdn: {},
    content: {},
    status: {}
  });

  useEffect(() => {
    const getData = async () => {

      var content_play = redux.get('play');
      if (!content_play) {

        const uuidstore = redux.get('play_uuid', true);

        if (uuidstore) await api('play', null, { uuid: uuidstore });
        else window.history.back();

        content_play = redux.get('play');
      }
      if (content_play) {
        content_play.load = true;
        //Esto es temporal debo bloquear en la api los contenidos no disponibles
        if (content_play.error) {
          window.history.back();
        }
        else setModel(content_play);
      }
    };
    getData();
  }, []);
  return (model && model.load) ? <Player model={model} /> : null;
}

export default {
  init,
  Content
};


const onThumbnail = event => {

  switch (event.type) {
    case 'mouseover':
      state_player.thumbnail.style.visibility = 'visible';
      state_player.thumbnail.style.opacity = '1';
      break;
    case 'mouseout':
      state_player.thumbnail.style.visibility = 'hidden';
      state_player.thumbnail.style.opacity = '0';
      break;
    default:
      if (!Array.isArray(state_player.thumbnail_reference)) break;
      const width_cover = state_player.thumbnail.offsetWidth;
      const media_cover = width_cover / 2;
      const width_bar = event.target.offsetWidth;
      const media_bar = width_bar / 2;
      const position = event.offsetX;

      var left = '0px';

      if (position < media_bar) {
        left = (position > media_cover) ? (position - media_cover) : '0';
      }
      else {
        left = ((position + media_cover) < width_bar) ? (position - media_cover) : (width_bar - width_cover);
      }
      state_player.thumbnail.style.left = left + 'px';

      const seg = parseFloat((state_player.duration * position) / width_bar).toFixed(3);


      const img = state_player.thumbnail_reference.find(item => item.d <= seg && seg <= item.h);

      if (img) {
        const xy = img.p.find(item => item.d <= seg && seg <= item.h);
        if (xy) {
          const pst = state_player.thumbnail_position.find(item => item.n === xy.n);
          if (pst) {
            state_player.thumbnail.style.backgroundImage = 'url(https://twimglevel3.cdnar.net/qb_od_push/' + state_player.uuid + '/previews/' + img.n + ')';
            state_player.thumbnail.style.backgroundPosition = '-' + pst.x + 'px -' + pst.y + 'px';
          }
        }
      }
      state_player.thumbnail_mintutes.textContent = toHHMMSS(seg);
      break;
  }
};

/*
  ######################## CONTROL DEL PLAYER DESDE AQUI ##################
*/
const onHtmlEvent = event => {
  switch (event.type) {
    case 'on-back':
      window.history.back();
      break;
    case 'on-replay':
      onPlayback({ progress: Math.floor(state_player.video.currentTime) });
      state_player.video.currentTime = state_player.video.currentTime - 10;
      break;
    case 'on-forward':
      onPlayback({ progress: Math.floor(state_player.video.currentTime) });
      state_player.video.currentTime = state_player.video.currentTime + 10;
      break;
    case 'on-scrim':
      state_player.languages = false;
      state_player.config_subtitles = false;
      state_player.element_languages.style.display = 'none';
      state_player.element_configuration.style.visibility = 'hidden';
      containerSubtitle('visible');
      //state_player.shaka_text_container.style.display = 'block';
      break;
    case 'on-config-subtitles':
      if (state_player.config_subtitles) {
        state_player.video.pause();
        state_player.element_configuration.style.visibility = 'visible';
        containerSubtitle('hidden');
        //console.log(state_player.shaka_text_container)
      }
      else {
        state_player.video.play();
        state_player.element_configuration.style.visibility = 'hidden';
        //state_player.shaka_text_container.style.display = 'block';
        containerSubtitle('visible');
      }
      break;
    case 'on-language':
      if (state_player.language_timer) clearTimeout(state_player.language_timer);
      state_player.language_timer = setTimeout(() => onHtmlEvent({ type: 'on-scrim' }), 4000);

      state_player.element_languages.style.display = state_player.languages ? 'none' : 'block';
      state_player.languages = !state_player.languages;
      break;
    case 'mouseover':
      if (state_player.language_timer) clearTimeout(state_player.language_timer);
      state_player.language_timer = setTimeout(() => onHtmlEvent({ type: 'on-scrim' }), 4000);
      state_player.bar_container.style.opacity = 0;
      state_player.bar_container.style.transition = 'opacity 0.4s linear';
      break;
    case 'mouseout':
      if (state_player.language_timer) clearTimeout(state_player.language_timer);
      state_player.language_timer = setTimeout(() => onHtmlEvent({ type: 'on-scrim' }), 4000);
      state_player.bar_container.style = 'none';
      break;
    case 'mousemove':
      if (state_player.language_timer) clearTimeout(state_player.language_timer);
      state_player.language_timer = setTimeout(() => onHtmlEvent({ type: 'on-scrim' }), 4000);
      break;
    case 'keydown':
      const {/*key,*/ code } = event;
      //console.log(code, state_player.pause)
      if (code === 'Space') {
        if (state_player.pause) state_player.video.play();
        else state_player.video.pause();
      }
      break;
    default:
      break;
  }
};

const onVideoEvent = event => {

  switch (event.type) {
    case 'loadedmetadata':
    case 'playing':
    case 'timeupdate':
      if (event.type === 'loadedmetadata') prepare_thumbnail(event);
      if (event.type !== 'timeupdate') state_player.pause = false;
      if (event.type === 'playing') {
        var key = 'play';
        if (!state_player.playing) {
          state_player.playing = true;
          key = 'load';
        }
        tracker(key, { currentTime: Math.floor(event.currentTarget.currentTime) });
      }

      //Tiempo para enviar data de progress
      if (new Date() > state_player.time_progress) {
        onPlayback({ progress: Math.floor(event.currentTarget.currentTime) });
        state_player.time_progress = session.set_time(1);
      }
      break;
    case 'pause':
      let progress = Math.floor(state_player.video.currentTime);
      if (!state_player.onback) {
        tracker('pause', { currentTime: progress });
      }
      onPlayback({ progress });
      state_player.pause = true;
      refreshBlockWatching(progress);
      break;
    default:
      break;
  }
};

const onPlayerEvent = event => {

  switch (event.type) {
    case 'error':
      onError(event.detail);
      break;
    default:
      break;
  }
};

const setStatusUserPlay = (element, { content }) => {
  const { runtime, audio_default, subtitle_tracks } = content;
  const { progress, language, subtitle } = content.status;

  element.currentTime = runtime;
  element.currentTime = 0;
  if (progress > 0) element.currentTime = progress;

  const playerConfig = {
    preferredAudioLanguage: language || audio_default,
    preferredTextLanguage: progress > 0 ? subtitle : subtitle_tracks,
  };
  if (playerConfig.preferredTextLanguage === null) {
    delete playerConfig.preferredTextLanguage;
  }

  window.player.configure(playerConfig);

  //si el audio y el subtitulo son iguales apago el subtitulo
  if (progress < 10 && playerConfig.preferredAudioLanguage === playerConfig.preferredTextLanguage) {
    window.player.setTextTrackVisibility(false);
  }
  return element;
};

function onError(error) {
  tracker('error', { code: error.code, message: error });
  console.error('Error code', error.code, 'object', error);
}

function onPlayback(playback) {
  if (state_player.playback_id) {
    playback.id = state_player.playback_id;
    api('playback', null, { playback });
  }
}

function containerSubtitle(type) {
  switch (type) {
    case 'init':
      state_player.shaka_text_container = document.querySelector('.shaka-text-container');
      const subtitles = redux.get('play_subtitles', true);
      state_player.size = subtitles ? subtitles.size : 's2';
      state_player.appearance = subtitles ? subtitles.appearance : 'a2';
      state_player.shaka_text_container.className = 'shaka-text-container ' + (state_player.size + ' ' + state_player.appearance);
      break;
    case 'change':
      tracker('config-subtitle', { size: state_player.size, appearance: state_player.appearance });
      redux.push('play_subtitles', { size: state_player.size, appearance: state_player.appearance }, true);
      state_player.shaka_text_container.className = 'shaka-text-container ' + state_player.size + ' ' + state_player.appearance;
      break;
    default:
      state_player.shaka_text_container.style.visibility = type;
      break;
  }
}

function events_shaka(type, video, model) {
  if (type === 'add') {
    state_player.time_progress = 0;

    state_player.video = setStatusUserPlay(video, model);

    ['onloadedmetadata',
      'ontimeupdate',//'onprogress',
      'onplaying',
      'onpause',
    ].forEach(event => state_player.video[event] = onVideoEvent);

    ['error',
    ].forEach(event => window.player.addEventListener(event, onPlayerEvent));
  }
  else {
    state_player.onback = true;
    tracker('on-back', { currentTime: Math.floor(state_player.video.currentTime) });
    ['error',
    ].forEach(event => window.player.removeEventListener(event, onPlayerEvent));
  }
}

function events_html(type) {

  const mobileCheck = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

  state_player.languages = false;
  state_player.config_subtitles = false;

  if (type === 'add') {
    state_player.bar_container = document.querySelector('.shaka-seek-bar-container');
    state_player.thumbnail = document.querySelector('.thumbnail-container');
    state_player.thumbnail_mintutes = document.querySelector('.thumbnail-container .minutes');

    state_player.container = document.querySelector('.shaka-controls-button-panel');
    state_player.element_header = document.querySelector('.element-header');
    state_player.element_replay_forward = document.querySelector('.element-replay-forward');
    state_player.element_info = document.querySelector('.element-info');
    state_player.element_languages = document.querySelector('.element-languages');
    state_player.element_configuration = document.querySelector('.element-configuration');
    state_player.element_configuration_subtitles = document.querySelector('.element-configuration-subtitles');

    state_player.container.appendChild(state_player.element_header);
    state_player.container.appendChild(state_player.element_replay_forward);
    state_player.container.appendChild(state_player.element_info);

    state_player.container.addEventListener('click', () => onHtmlEvent({ type: 'on-scrim' }));

    state_player.icon_language = document.querySelector('.shaka-overflow-menu-button');
    state_player.icon_language.addEventListener('click', () => onHtmlEvent({ type: 'on-language' }));

    state_player.scrim_container = document.querySelector('.shaka-scrim-container');
    state_player.scrim_container.addEventListener('click', () => onHtmlEvent({ type: 'on-scrim' }));

    state_player.on_back = document.querySelector('.on-back');
    state_player.on_back.addEventListener('click', () => onHtmlEvent({ type: 'on-back' }));

    state_player.on_replay = document.querySelector('.on-replay');
    state_player.on_replay.addEventListener('click', () => onHtmlEvent({ type: 'on-replay' }));

    state_player.on_forward = document.querySelector('.on-forward');
    state_player.on_forward.addEventListener('click', () => onHtmlEvent({ type: 'on-forward' }));

    if (!mobileCheck) {
      state_player.icon_volumen = document.querySelector('.shaka-mute-button');
      state_player.bar_volumen = document.querySelector('.shaka-volume-bar');

      ['mouseover', 'mouseout'].forEach(event => {
        state_player.icon_volumen.addEventListener(event, onHtmlEvent);
        state_player.bar_volumen.addEventListener(event, onHtmlEvent);
      });
      ['mouseover', 'mouseout', 'mousemove'].forEach(event => {
        state_player.bar_container.addEventListener(event, onThumbnail);
        state_player.element_languages.addEventListener(event, onHtmlEvent);
        state_player.element_configuration_subtitles.addEventListener(event, onHtmlEvent);
      });

      document.addEventListener('keydown', onHtmlEvent);
    }
    else {
      state_player.play_container = document.querySelector('.shaka-play-button-container');
      state_player.play_container.addEventListener('click', () => onHtmlEvent({ type: 'on-scrim' }));
    }
  }
  else {

    state_player.container.removeEventListener('click', onHtmlEvent);
    state_player.icon_language.removeEventListener('click', onHtmlEvent);
    state_player.scrim_container.removeEventListener('click', onHtmlEvent);
    state_player.on_back.removeEventListener('click', onHtmlEvent);
    state_player.on_replay.removeEventListener('click', onHtmlEvent);
    state_player.on_forward.removeEventListener('click', onHtmlEvent);

    if (!mobileCheck) {

      ['mouseover', 'mouseout'].forEach(event => {
        state_player.icon_volumen.removeEventListener(event, onHtmlEvent);
        state_player.bar_volumen.removeEventListener(event, onHtmlEvent);
      });
      ['mouseover', 'mouseout', 'mousemove'].forEach(event => {
        state_player.bar_container.addEventListener(event, onThumbnail);
        state_player.element_languages.removeEventListener(event, onHtmlEvent);
        state_player.element_configuration_subtitles.removeEventListener(event, onHtmlEvent);
      });

      document.removeEventListener('keydown', onHtmlEvent);
    }
    else {
      state_player.play_container.removeEventListener('click', onHtmlEvent);
    }
  }
}

function prepare_thumbnail(event) {

  var i, z;
  var { duration } = event.currentTarget;
  const frame = 240;
  var data = [];
  const parte = parseFloat(parseFloat(frame / 100).toFixed(1));
  var contad1 = 0;
  var contad2 = parte;
  var contador1 = 0;
  var contador2 = 0;

  const bgposition = [];
  const width = 240;
  const height = 120;
  var x = 0;
  var y = 0;
  for (i = 0; i < 100; i++) {
    if ([10, 20, 30, 40, 50, 60, 70, 80, 90].indexOf(i) !== -1) {
      y = (y + height);
      x = 0;
    }
    bgposition[i] = { n: (i + 1), x, y };
    x = (x + width);
  }
  for (i = 1; i < duration; i++) {
    if (i === (contador2 + 1)) {
      const cont3 = (contador1 + 1);
      var contador = '0' + ((cont3 < 10) ? ('0' + cont3) : cont3);
      data[contador1] = { n: 'images_' + contador + '.jpg', d: parseFloat(parseFloat(contador2 > 0 ? contador2 + 0.1 : 0).toFixed(1)), h: (contador2 + frame), p: [] };

      for (z = 0; z < 100; z++) {
        data[contador1].p[z] = { n: (z + 1), d: (parseFloat(parseFloat(contad1 !== 0 ? contad1 + 0.1 : contad1).toFixed(1))), h: contad2 };
        contad1 = parseFloat(parseFloat((contad1 + parte)).toFixed(1));
        contad2 = parseFloat(parseFloat(contad2 + parte).toFixed(1));
      }
      contador2 = (contador2 + frame);
      contador1++;
    }
  }
  state_player.duration = duration;
  state_player.mintutes = duration / 60;
  state_player.thumbnail_reference = data;
  state_player.thumbnail_position = bgposition;
}

function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  var result = [hours, minutes, seconds]
    .map(v => v < 10 ? '0' + v : v)
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
  if (result.indexOf('0-1:') !== -1) result = 'Ver de nuevo';
  return result;
}

/*
  debo migrar esto a otro sitio
*/
function refreshBlockWatching(progress) {

  let { uuid } = state_player;

  let slug_uuid = slug(uuid);
  var content_uuids = redux.get('content_uuids');
  let content = content_uuids[slug_uuid];
  if (content) {
    let { status } = content;
    status = status ?? {};
    status.progress = progress;
    content_uuids[slug_uuid] = {
      ...content,
      status
    };
    let watching = models.content_min(JSON.parse(JSON.stringify(content_uuids[slug_uuid])), 'watching');
    redux.push('content_uuids', content_uuids);
    redux.push('watching', watching);

    let blocks = redux.get('blocks').map(row => {
      if (row.style === 'watching') {
        row.data.elements = [watching].concat(row.data.elements.filter(row => row.uuid !== uuid));
      }
      return row;
    });
    redux.push('blocks', blocks);
    redux.push('watching', uuid);
  }
}