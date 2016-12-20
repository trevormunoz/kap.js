import 'file?name=vendor/[name].[ext]!manifesto.js/dist/client/manifesto.min.js';
import 'file?name=vendor/[name].[ext]!openseadragon/build/openseadragon/openseadragon.min.js';

var el = document.getElementById('viewer');

if (el) {
  const baseUri = 'http://iiif.katherine-anne-porter.us/manifests/';
  const item = el.dataset.itemId;
  const manifestUri = `${baseUri}${item}-manifest.json`;

  const manifestPromise = (uri) => new Promise(function(resolve, reject) {
    manifesto.loadManifest(uri).then((manifest) => {
      const m = manifesto.create(manifest);
      if (m.getTotalSequences() === 1) {
        // walk down to get the resources …
        const canvases = m.getSequenceByIndex(0).getCanvases();
        const images = canvases.map( c => { return c.getImages()[0] });
        const resources = images.map( i => { return `${i.getResource().id}/info.json` });
        resolve(resources);
      } else {
        if (m.getSequences() === []) {
          const statusText = 'There\'s no data here!';
          reject(statusText);
        }
      }
    });
  });

  manifestPromise(manifestUri).then((tsArray) => {
    const osd = OpenSeadragon({
      id:                 'item-viewer',
      prefixUrl:          '/static/vendor/openseadragon/images/',
      preserveViewport:   true,
      visibilityRatio:    1,
      minZoomLevel:       1,
      defaultZoomLevel:   1,
      sequenceMode:       true,
      tileSources:        tsArray
    });
  });

}
