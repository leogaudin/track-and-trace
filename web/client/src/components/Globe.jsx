import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { blue } from "../theme/colors";

function hexToRGBArray(colorCode) {
	// Remove the '#' symbol if present
	const sanitizedColorCode = colorCode.replace('#', '');

	// Convert the hexadecimal color code to decimal values
	const red = parseInt(sanitizedColorCode.substr(0, 2), 16);
	const green = parseInt(sanitizedColorCode.substr(2, 2), 16);
	const blue = parseInt(sanitizedColorCode.substr(4, 2), 16);

	// Normalize the RGB values to the range of 0 to 1
	const normalizedRed = red / 255;
	const normalizedGreen = green / 255;
	const normalizedBlue = blue / 255;

	// Return the RGB values as an array
	return [normalizedRed, normalizedGreen, normalizedBlue];
  }


export default function Globe() {
  const canvasRef = useRef();
  const SIZE = 700;
  const color = blue.main;

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi: 0,
      theta: 0,
      dark: 0.99,
      diffuse: 1.5,
      mapSamples: 14000,
      mapBrightness: 5,
      baseColor: hexToRGBArray(blue.main),
      markerColor: hexToRGBArray(blue.light),
      glowColor: hexToRGBArray(blue.main),
      markers: [
		{ location: [40.516314385683806, -3.664187832967221], size: 0.02 },
		{ location: [43.380121722925956, -2.960302583012931], size: 0.02 },
		{ location: [36.69979910761048, -4.439668282276742], size: 0.05 },
		{ location: [38.31445460281415, -0.517982215341859], size: 0.03 },
		{ location: [41.43580210942597, 2.1694983323247734], size: 0.02 },
		{ location: [48.89685050264046, 2.3185194258505755], size: 0.03 },
		{ location: [45.783463154986734, 4.746984468248205], size: 0.02 },
		{ location: [40.191854267103814, 44.47936076854719], size: 0.02 },
		{ location: [-34.92804017283984, 138.59738552603034], size: 0.02 },
		{ location: [48.248455059959895, 16.36840289771301], size: 0.03 },
		{ location: [50.845409346017895, 4.357378497829092], size: 0.02 },
		{ location: [51.21263932653407, 4.4233200956481316], size: 0.02 },
		{ location: [-23.557369134698845, -46.68949310000001], size: 0.02 },
		{ location: [-22.893709591733252, -43.19670947011024], size: 0.02 },
		{ location: [46.812047157251605, -71.2238417], size: 0.03 },
		{ location: [50.11104389110869, 14.517540568959923], size: 0.02 },
		{ location: [60.180776092402965, 24.958245062878174], size: 0.02 },
		{ location: [45.655206000816726, 0.15895312883586085], size: 0.02 },
		{ location: [49.48977747142472, 0.12549336893201676], size: 0.03 },
		{ location: [47.738421586520516, 7.3274942265265395], size: 0.02 },
		{ location: [43.68347561236782, 7.202513997520135], size: 0.02 },
		{ location: [42.69843003647246, 2.8884202551522], size: 0.02 },
		{ location: [52.48441033843524, 13.449748669068816], size: 0.02 },
		{ location: [49.1520863713735, 9.21583512658874], size: 0.03 },
		{ location: [52.426761872036835, 10.789548655573608], size: 0.02 },
		{ location: [41.90148527655181, 12.5034303663768], size: 0.02 },
		{ location: [43.77086745257873, 11.242770300000002], size: 0.02 },
		{ location: [35.664610356016894, 139.73778729721943], size: 0.02 },
		{ location: [49.50273237527837, 5.947536108465149], size: 0.02 },
		{ location: [3.0664161004596657, 101.60611243557409], size: 0.03 },
		{ location: [32.220040891355495, -7.939814403087972], size: 0.02 },
		{ location: [32.88216390117324, -6.897824656666904], size: 0.02 },
		{ location: [38.73064328866193, -9.129865114664735], size: 0.02 },
		{ location: [41.149886592617456, -8.609728802580305], size: 0.03 },
		{ location: [55.781994140394325, 49.12516122388279], size: 0.02 },
		{ location: [55.79712224423239, 37.57987929710178], size: 0.03 },
		{ location: [1.4247614545733323, 103.8503291414543], size: 0.03 },
		{ location: [37.48817732950216, 127.06476110240605], size: 0.02 },
		{ location: [46.5323231, 6.5920051288358605], size: 0.02 },
		{ location: [13.727590186661764, 100.77833929668391], size: 0.02 },
		{ location: [52.37445367202344, 4.915632097899531], size: 0.02 },
		{ location: [41.104814755602916, 28.98692989741794], size: 0.03 },
		{ location: [40.79257879396576, 29.510695668570065], size: 0.02 },
		{ location: [24.51991918269369, 54.36797837198244], size: 0.02 },
		{ location: [51.49241155349793, -0.1257111072087514], size: 0.02 },
		{ location: [35.651036890655256, -5.306023018124441], size: 0.02 }
	  ]
	  ,
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: SIZE, height: SIZE, maxWidth: "100%", aspectRatio: 1 }}
      />
    </>
  );
}
