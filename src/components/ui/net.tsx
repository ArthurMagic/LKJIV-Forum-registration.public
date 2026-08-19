import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

function NetworkBG() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffectRef.current && vantaRef.current) {
      // Sichere Abfrage für ES-Module / CommonJS Bündelung
      const netInit = (NET as any).default || NET;

      vantaEffectRef.current = netInit({
        el: vantaRef.current,
        THREE: THREE, // Binde lokale Three.js Instanz ein
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,

        // Farben
        color: 0xe30613,
        backgroundColor: 0x111827,
        backgroundAlpha: 1.00,

        // Netz-Einstellungen
        scale: 2,         // Zoomt ins Netz rein (füllt die Spitze besser aus)
        scaleMobile: 1.00,
        points: 12.00,        // Mehr Punkte im Netz
        spacing: 10.00,      // Engerer Abstand der Punkte
        maxDistance: 18.00,  // Länge der Verbindungslinien
        showDots: true,
      });
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* GLOW-WRAPPER (Schatten entlang der Kante) */}
      <div className="absolute top-0 right-0 w-[65vw] h-[85vh] filter drop-shadow-[-10px_10px_30px_rgba(17,24,39,1)]">

        {/* DREIECK VANTA CONTAINER */}
        <div
          ref={vantaRef}
          className="w-full h-full [clip-path:polygon(100%_0%,_100%_60%,_35%_90%,_50%_0%)]"
        />
      </div>
    </>
  );
}

export default NetworkBG;