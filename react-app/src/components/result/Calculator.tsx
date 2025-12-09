import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "../../control";
import { addValue } from "../../redux/actions/valuesActions";
import { addShearData } from "../../redux/actions/shearDataActions";
import { addMomentData } from "../../redux/actions/momentDataActions";
import { addResult } from "../../redux/actions/resultsActions";
import { addDeflectionData } from "../../redux/actions/deflectionDataActions";
import { useTranslation } from "react-i18next";

const Calculator: FC = () => {
  const { t } = useTranslation(["result"]);
  const dispatch = useDispatch();
  const values = useSelector((state: any) => state.values.values);

  const X: string[] = [];
  let XAxis: number[] = [];
  // Luodaan tyhjät taulukot kuormituksille
  const [pointLoads, setPointLoads] = useState<any[]>([[]]);
  const [pointMoments, setPointMoments] = useState<any[]>([[]]);
  const [distributedLoads, setDistributedLoads] = useState<any[]>([[]]);
  const [linearLoads, setLinearLoads] = useState<any[]>([[]]);

  // Luodaan tyhjä tukireaktio-taulukko
  const reactions: number[] = [];
  // Haetaan käyttöliittymästä palkin pituus ja tukien sijainnit
  // Voidaan syöttää desimaaliluku
  const span = parseFloat(values.span);
  const A = parseFloat(values.a);
  const B = parseFloat(values.b);
  console.log("values Calculator", values);
  // apumuuttujat tukireaktiota laskettaessa
  let va, ha, vb;
  // eri kuormituksista saadut momenttien ja leikkausvoimien arvot
  let leikkausvoima: number[][] = [];
  let momentti: number[][] = [];

  // Luodaan tyhjät tulostustaulukot, johon summautuu lopulliset momenttien ja leikkausvoimien arvot
  let newMoment: any[] = [];
  let newShearforce: any[] = [];
  let newDeflection = [];

  let delta = 0.01; // Range of x-coordinates

  console.log("values.width", values.width); // 200000000
  console.log("values.height", values.height);
  console.log("values.materialNumber", values.materialNumber);

  // User Input
  // INPUT GUESS FOR INITIAL ROTATION AT SUPPORT A AND SWEEP STEP
  const deltaRot = 0.000005; // The step size in rotation guesses
  const initRot = -0.0021; // Initial value for rotation at support A (ASSUMED VALUE)
  const E = parseInt(values.materialNumber) * 10 ** 3; // (N/m^2) Young's modulus
  const I =
    ((parseFloat(values.width) / 1000) *
      (parseFloat(values.height) / 1000) ** 3) /
    12; // (m^4) Second moment of area

  // Initial constants
  const delX = delta;
  const EI = E * I;
  const initDef = 0;
  const supportIndexA = A / delta;
  const supportIndexB = B / delta;
  console.log("EI", EI);
  console.log("supportIndexA", supportIndexA);
  console.log("supportIndexB", supportIndexB);
  let solvedInitRotation: number;
  console.log("EI", EI);

  var Rotation = new Array();
  var Deflection = new Array();

  // Alustetaan viivadiagrammit
  const [shearData, setShearData] = useState<any>({
    data: {
      labels: [],
      datasets: [
        {
          label: t("result:xAxel"),
          data: [],
          borderColor: "black",
          borderWidth: 3,
          tension: 0.1,
          pointRadius: 0,
        },
        {
          label: "V [kN]",
          data: [],
          backgroundColor: "#97ff97",
          borderColor: "green",
          borderWidth: 1,
          fill: true,
          tension: 0.1,
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: t("result:shearForceDiagram"),
        },
      },
      // maintainAspectRatio: true,
      // scales: {
      //   yAxes: [
      //     {
      //       ticks: {
      //         beginAtZero: false,
      //       },
      //     },
      //   ],
      // },
    },
  });

  const [momentData, setMomentData] = useState<any>({
    dat: {
      labels: [],
      datasets: [
        {
          label: t("result:xAxel"),
          data: [],
          borderColor: "black",
          borderWidth: 3,
          tension: 0.1,
          pointRadius: 0,
        },
        {
          label: "M [kNm]",
          data: [],
          backgroundColor: "#ffe5e5",
          borderColor: "red",
          borderWidth: 1,
          fill: true,
          tension: 0.1,
          pointRadius: 0,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: t("result:bendingMomentDiagram"),
        },
      },
      // maintainAspectRatio: true,
      // scales: {
      //   yAxes: [
      //     {
      //       ticks: {
      //         beginAtZero: false,
      //       },
      //     },
      //   ],
      // },
    },
  });

  // Lisätään kuormituksille taulukkoon taulukko (esim. kaksi taulukkoa taulukossa [[], []])
  useEffect(() => {
    setPointLoads([[parseInt(values.xp1), 0, parseInt(values.fy1)]]);
    setPointMoments([[parseInt(values.xm1), parseInt(values.m1)]]);
    setDistributedLoads([
      [
        parseInt(values.xStartUDL1),
        parseInt(values.xEndUDL1),
        parseInt(values.fyUDL1),
      ],
    ]);
    setLinearLoads([
      [
        parseInt(values.xStartLDL1),
        parseInt(values.xEndLDL1),
        parseInt(values.fy_StartLDL1),
        parseInt(values.fy_EndLDL1),
      ],
    ]);
  }, [values.changed == false]);

  // Varsinainen laskentafunktio, jota kutsutaan
  const CalculateForce = () => {
    // Lisätään toinen pistekuorma
    if (values.fy2) {
      pointLoads.push([parseInt(values.xp2), 0, parseInt(values.fy2)]);
    }
    // Lisätään kolmas pistekuorma
    if (values.fy3) {
      pointLoads.push([parseInt(values.xp3), 0, parseInt(values.fy3)]);
    }
    // Lisätään toinen pistemomentti
    if (values.m2) {
      pointMoments.push([parseInt(values.xm2), parseInt(values.m2)]);
    }
    // Lisätään kolmas pistemomentti
    if (values.m3) {
      pointMoments.push([parseInt(values.xm3), parseInt(values.m3)]);
    }
    // Lisätään toinen tasainen viivakuorma
    if (values.fyUDL2) {
      distributedLoads.push([
        parseInt(values.xStartUDL2),
        parseInt(values.xEndUDL2),
        parseInt(values.fyUDL2),
      ]);
    }
    // Lisätään kolmas tasainen viivakuorma
    if (values.fyUDL3) {
      distributedLoads.push([
        parseInt(values.xStartUDL3),
        parseInt(values.xEndUDL3),
        parseInt(values.fyUDL3),
      ]);
    }
    // Lisätään toinen lineaarinen viivakuorma
    if (values.fy_EndLDL2) {
      linearLoads.push([
        parseInt(values.xStartLDL2),
        parseInt(values.xEndLDL2),
        parseInt(values.fy_StartLDL2),
        parseInt(values.fy_EndLDL2),
      ]);
    }
    // Lisätään kolmas lineaarinen viivakuorma
    if (values.fy_EndLDL3) {
      linearLoads.push([
        parseInt(values.xStartLDL3),
        parseInt(values.xEndLDL3),
        parseInt(values.fy_StartLDL3),
        parseInt(values.fy_EndLDL3),
      ]);
    }

    // jaetaan palkin pituusmetri 100 osaan <-- delta = 0.01 annettu ylhäällä
    // palkin osamitat taulukkoon, jota käytetään laskennassa
    for (var i = 0; i < span; i += delta) {
      X.push(i.toFixed(2));
    }
    // x-akselin arvot viivadiagrammiin
    for (var j = 0; j < span; j += delta) {
      XAxis.push(0);
    }

    // lasketaan kuormitusten lkm
    const nPL = pointLoads.length; // Test for point loads to consider
    const nPM = pointMoments.length;
    const nUDL = distributedLoads.length;
    const nLDL = linearLoads.length;

    // Alustetaan tukireaktiot
    reactions.push(0);
    reactions.push(0);
    reactions.push(0);
    // Lasketaan tukireaktio PL-kuormitustapauksissa
    const reactions_PL = (index: number) => {
      let xp = pointLoads[index][0];
      let fx = pointLoads[index][1];
      let fy = pointLoads[index][2];
      let la_p = A - xp;
      let mp = fy * la_p;
      let la_vp = B - A;
      let Vb = mp / la_vp;
      let Va = -fy - Vb;
      let Ha = -fx;

      return { Va, Ha, Vb };
    };

    // Lasketaan tukireaktio PM-kuormitustapauksissa
    const reactions_PM = (index: number) => {
      let xm = pointMoments[index][0];
      let m = pointMoments[index][1];
      let la_vb = B - A;
      let Vb = m / la_vb;
      let Va = -Vb;

      return { Va, Vb };
    };

    // Lasketaan tukireaktio UDL-kuormitustapauksissa
    const reactions_UDL = (index: number) => {
      let xStart = distributedLoads[index][0];
      let xEnd = distributedLoads[index][1];
      let fy = distributedLoads[index][2];
      const fy_Res = fy * (xEnd - xStart);
      const x_Res = xStart + 0.5 * (xEnd - xStart);
      let la_p = A - x_Res;
      let mp = fy_Res * la_p;
      let la_vp = B - A;
      let Vb = mp / la_vp;
      let Va = -fy_Res - Vb;

      return { Va, Vb };
    };

    // Lasketaan tukireaktio LDL-kuormitustapauksissa
    const reactions_LDL = (index: number) => {
      let xStart = linearLoads[index][0];
      let xEnd = linearLoads[index][1];
      let fy_Start = linearLoads[index][2];
      let fy_End = linearLoads[index][3];
      let fy_Res = 0;
      let x_Res = 0;

      if (Math.abs(fy_Start) > 0) {
        fy_Res = 0.5 * fy_Start * (xEnd - xStart);
        x_Res = xStart + (1 / 3) * (xEnd - xStart);
      } else {
        fy_Res = 0.5 * fy_End * (xEnd - xStart);
        x_Res = xStart + (2 / 3) * (xEnd - xStart);
      }

      let la_p = A - x_Res;
      let mp = fy_Res * la_p;
      let la_vp = B - A;
      let Vb = mp / la_vp;
      let Va = -fy_Res - Vb;

      return { Va, Vb };
    };

    // HUOM! TÄSTÄ MENEE HOMMA SEKAISIN reactions = NaN //
    // Summataan yksittäiset (index) PL-kuormitusten tukirektiot PL_record-taulukkoon
    let PL_record: number[][] = [];
    if (nPL > 0) {
      for (let index in pointLoads) {
        const indexNumber = Number(index);
        va = reactions_PL(indexNumber).Va; // yksittäisen pistekuormituksen vasen tukireaktio (pysty)
        ha = reactions_PL(indexNumber).Ha; // yksittäisen pistekuormituksen vasen tukireaktio (pysty)
        vb = reactions_PL(indexNumber).Vb; // yksittäisen pistekuormituksen oikea tukireaktio

        // Summaa tukireaktiot taulukkoon ([[1.tulos], [2.tulos]] <= kaksi pistekuormatapausta)
        // käytetään jatkossa momentin ja leikkausvoimien laskennassa
        PL_record.push([va, ha, vb]);

        // lopulliset tukireaktiot
        reactions[0] = reactions[0] + va;
        reactions[1] = reactions[1] + ha;
        reactions[2] = reactions[2] + vb;
      }
    }

    // PM-kuormitusten tukireaktioiden summaus
    let PM_record: number[][] = [];
    if (nPM > 0) {
      for (let index in pointMoments) {
        const indexNumber = Number(index);
        va = reactions_PM(indexNumber).Va;
        vb = reactions_PM(indexNumber).Vb;

        PM_record.push([va, vb]);

        reactions[0] = reactions[0] + va;
        reactions[2] = reactions[2] + vb;
      }
    }

    // UDL-kuormitusten tukireaktioiden summaus
    let UDL_record: number[][] = [];
    if (nUDL > 0) {
      for (let index in distributedLoads) {
        const indexNumber = Number(index);
        va = reactions_UDL(indexNumber).Va;
        vb = reactions_UDL(indexNumber).Vb;

        UDL_record.push([va, vb]);

        reactions[0] = reactions[0] + va;
        reactions[2] = reactions[2] + vb;
      }
    }

    // LDL-kuormitusten tukireaktioiden summaus
    let LDL_record: number[][] = [];
    if (nLDL > 0) {
      for (let index in linearLoads) {
        const indexNumber = Number(index);
        va = reactions_LDL(indexNumber).Va;
        vb = reactions_LDL(indexNumber).Vb;

        LDL_record.push([va, vb]);

        reactions[0] = reactions[0] + va;
        reactions[2] = reactions[2] + vb;
      }
    }

    // Lasketaan momentti ja leikkausvoima yksittäisissä (index) PL-kuormitustapauksissa
    const shear_moment_PL = (index: number) => {
      let xp = pointLoads[index][0]; // pistekuorman etäisyys palkin vasemmasta laidasta
      let fy = pointLoads[index][2]; // pistekuorman suuruus
      let Va = PL_record[index][0]; // vasen tukireaktio
      let Vb = PL_record[index][2]; // oikea tukireaktio

      // Luodaan tyhjät momentti ja leikkausvoimataulukot
      let Shear = [];
      let Moment = [];

      // käydään koko palkin pituus läpi
      for (let x in X) {
        const xNumber = Number(x);
        let shear = 0;
        let moment = 0;

        if (xNumber / 100 > A) {
          shear = shear + Va;
          moment = moment - Va * (xNumber / 100 - A);
        }

        if (xNumber / 100 > B) {
          shear = shear + Vb;
          moment = moment - Vb * (xNumber / 100 - B);
        }

        if (xNumber / 100 > xp) {
          shear = shear + fy;
          moment = moment - fy * (xNumber / 100 - xp);
        }

        Shear.push(shear);
        Moment.push(moment);
      }

      // palautetaan saatu momentti/leikkausvoima-data
      return { Shear, Moment };
    };

    // Lasketaan momentti ja leikkausvoima yksittäisissä (index) PM-kuormitustapauksissa
    const shear_moment_PM = (index: number) => {
      let xm = pointMoments[index][0]; // pistemomentin etäisyys palkin vasemmasta laidasta
      let m = pointMoments[index][1]; // pistemomentin suuruus palkin vasemmasta laidasta
      let Va = PM_record[index][0];
      let Vb = PM_record[index][1];

      let Shear = [];
      let Moment = [];

      for (let x in X) {
        const xNumber = Number(x);
        let shear = 0;
        let moment = 0;

        if (xNumber / 100 > A) {
          shear = shear + Va;
          moment = moment - Va * (xNumber / 100 - A);
        }

        if (xNumber / 100 > B) {
          shear = shear + Vb;
          moment = moment - Vb * (xNumber / 100 - B);
        }

        if (xNumber / 100 > xm) {
          moment = moment - m;
        }

        Shear.push(shear);
        Moment.push(moment);
      }
      return { Shear, Moment };
    };

    // Lasketaan momentti ja leikkausvoima yksittäisissä (index) UDL-kuormitustapauksissa
    const shear_moment_UDL = (index: number) => {
      let xStart = distributedLoads[index][0]; // tasaisen viivakuorman aloituksen etäisyys palkin vasemmasta laidasta
      let xEnd = distributedLoads[index][1]; // tasaisen viivakuorman lopetuksen etäisyys palkin vasemmasta laidasta
      let fy = distributedLoads[index][2]; // tasaisen viivakuorman suuruus
      let Va = UDL_record[index][0];
      let Vb = UDL_record[index][1];

      let Shear = [];
      let Moment = [];

      for (let x in X) {
        const xNumber = Number(x);
        let shear = 0;
        let moment = 0;

        if (xNumber / 100 > A) {
          shear = shear + Va;
          moment = moment - Va * (xNumber / 100 - A);
        }

        if (xNumber / 100 > B) {
          shear = shear + Vb;
          moment = moment - Vb * (xNumber / 100 - B);
        }

        if (xNumber / 100 > xStart && xNumber / 100 <= xEnd) {
          shear = shear + fy * (xNumber / 100 - xStart);
          moment =
            moment -
            fy * (xNumber / 100 - xStart) * 0.5 * (xNumber / 100 - xStart);
        } else if (xNumber / 100 > xEnd) {
          shear = shear + fy * (xEnd - xStart);
          moment =
            moment -
            fy *
              (xEnd - xStart) *
              (xNumber / 100 - xStart - 0.5 * (xEnd - xStart));
        }

        Shear.push(shear);
        Moment.push(moment);
      }
      return { Shear, Moment };
    };

    // Lasketaan momentti ja leikkausvoima yksittäisissä (index) LDL-kuormitustapauksissa
    const shear_moment_LDL = (index: number) => {
      let xStart = linearLoads[index][0]; // lineaarisen viivakuorman aloituksen etäisyys palkin vasemmasta laidasta
      let xEnd = linearLoads[index][1]; // lineaarisen viivakuorman lopetuksen etäisyys palkin vasemmasta laidasta
      let fy_Start = linearLoads[index][2]; // lineaarisen viivakuorman aloituksen suuruus
      let fy_End = linearLoads[index][3]; // lineaarisen viivakuorman lopetuksen suuruus
      let Va = LDL_record[index][0];
      let Vb = LDL_record[index][1];

      let Shear = []; // Shear = np.zeros(len(X))  #Initialise a container to hold all shear force data for this LDL
      let Moment = [];

      for (let x in X) {
        const xNumber = Number(x);
        let shear = 0;
        let moment = 0;

        if (xNumber / 100 > A) {
          shear = shear + Va;
          moment = moment - Va * (xNumber / 100 - A);
        }

        if (xNumber / 100 > B) {
          shear = shear + Vb;
          moment = moment - Vb * (xNumber / 100 - B);
        }

        if (xNumber / 100 > xStart && xNumber / 100 <= xEnd) {
          if (Math.abs(fy_Start) > 0) {
            const x_base = xNumber / 100 - xStart;
            const f_cut = fy_Start - x_base * (fy_Start / (xEnd - xStart));
            const R1 = 0.5 * x_base * (fy_Start - f_cut);
            const R2 = x_base * f_cut;
            shear = shear + R1 + R2;
            moment = moment - R1 * (2 / 3) * x_base - R2 * (x_base / 2);
          } else {
            const x_base = xNumber / 100 - xStart;
            const f_cut = fy_End * (x_base / (xEnd - xStart));
            const R = 0.5 * x_base * f_cut;
            shear = shear + R;
            moment = moment - R * (x_base / 3);
          }
        } else if (xNumber / 100 > xEnd) {
          if (Math.abs(fy_Start) > 0) {
            const R = 0.5 * fy_Start * (xEnd - xStart);
            const xr = xStart + (1 / 3) * (xEnd - xStart);
            shear = shear + R;
            moment = moment - R * (xNumber / 100 - xr);
          } else {
            const R = 0.5 * fy_End * (xEnd - xStart);
            const xr = xStart + (2 / 3) * (xEnd - xStart);
            shear = shear + R;
            moment = moment - R * (xNumber / 100 - xr);
          }
        }

        Shear.push(shear);
        Moment.push(moment);
      }
      return { Shear, Moment };
    };

    // Summataan PL-kuormitustapausten momentti ja leikkausvoimat
    if (nPL > 0) {
      for (let index in pointLoads) {
        const indexNumber = Number(index);
        leikkausvoima.push(shear_moment_PL(indexNumber).Shear);
        momentti.push(shear_moment_PL(indexNumber).Moment);
      }
    }
    // Summataan PM-kuormitustapausten momentti ja leikkausvoimat
    if (nPM > 0) {
      for (let index in pointMoments) {
        const indexNumber = Number(index);
        leikkausvoima.push(shear_moment_PM(indexNumber).Shear);
        momentti.push(shear_moment_PM(indexNumber).Moment);
      }
    }
    // Summataan UDL-kuormitustapausten momentti ja leikkausvoimat
    if (nUDL > 0) {
      for (let index in distributedLoads) {
        const indexNumber = Number(index);
        leikkausvoima.push(shear_moment_UDL(indexNumber).Shear);
        momentti.push(shear_moment_UDL(indexNumber).Moment);
      }
    }
    // Summataan LDL-kuormitustapausten momentti ja leikkausvoimat
    if (nLDL > 0) {
      for (let index in linearLoads) {
        const indexNumber = Number(index);
        leikkausvoima.push(shear_moment_LDL(indexNumber).Shear);
        momentti.push(shear_moment_LDL(indexNumber).Moment);
      }
    }

    // Summataan kaikkien kuormitustapausten leikkausvoimat ja momentit
    leikkausvoima.forEach((arr) => {
      arr.forEach((value: any, i: any) => {
        if (newShearforce[i]) {
          newShearforce[i] += value;
        } else {
          newShearforce[i] = value;
        }
      });
    });

    momentti.forEach((arr) => {
      arr.forEach((value: any, i: any) => {
        if (newMoment[i]) newMoment[i] += value;
        else newMoment[i] = value;
      });
    });

    // taulukoiden tyhjennys
    leikkausvoima.length = 0;
    momentti.length = 0;

    // Maksimiarvojen haku taulukosta
    const maxShearforce = Math.max(...newShearforce);
    const minShearforce = Math.min(...newShearforce);
    const maxMoment = Math.max(...newMoment);
    const minMoment = Math.min(...newMoment);

    // tukireaktiot (näkyy konsolissa)
    console.log("Pystykuorma pisteessä A on " + reactions[0] + " [kN]");
    console.log(
      "Pystykuorma pisteessä B on " + reactions[2].toFixed(2) + " [kN]"
    );
    console.log(
      "Vaakakuorma pisteessä A on " + reactions[1].toFixed(2) + " [kN]"
    );

    // asetetaan check-arvoksi "true" --> laskennan arvot ok.
    dispatch(
      addValue({
        check: true,
      })
    );

    // asetaan shearData/momentData-stateen koko viivadiagrammin tarvitsemat data-asetukset
    dispatch(
      addShearData({
        data: {
          labels: X,
          datasets: [
            {
              label: t("result:xAxel"),
              data: XAxis,
              borderColor: "black",
              borderWidth: 3,
              tension: 0.1,
              pointRadius: 0,
            },
            {
              label: "V [kN]",
              data: newShearforce,
              backgroundColor: "#97ff97",
              borderColor: "green",
              borderWidth: 1,
              fill: true,
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: t("result:shearForceDiagram"),
            },
          },
          // maintainAspectRatio: true,
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: false,
          //       },
          //     },
          //   ],
          // },
        },
      })
    );

    dispatch(
      addMomentData({
        data: {
          labels: X,
          datasets: [
            {
              label: t("result:xAxel"),
              data: XAxis,
              borderColor: "black",
              borderWidth: 3,
              tension: 0.1,
              pointRadius: 0,
            },
            {
              label: "M [kNm]",
              data: newMoment,
              backgroundColor: "#ffe5e5",
              borderColor: "red",
              borderWidth: 1,
              fill: true,
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: t("result:bendingMomentDiagram"),
            },
          },
          // maintainAspectRatio: true,
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: false,
          //       },
          //     },
          //   ],
          // },
        },
      })
    );
    setShearData({
      data: {
        labels: X,
        datasets: [
          {
            label: t("result:xAxel"),
            data: XAxis,
            borderColor: "black",
            borderWidth: 3,
            tension: 0.1,
            pointRadius: 0,
          },
          {
            label: "V [kN]",
            data: newShearforce,
            backgroundColor: "#97ff97",
            borderColor: "green",
            borderWidth: 1,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: t("result:shearForceDiagram"),
          },
        },
        // maintainAspectRatio: true,
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: false,
        //       },
        //     },
        //   ],
        // },
      },
    });
    setMomentData({
      data: {
        labels: X,
        datasets: [
          {
            label: t("result:xAxel"),
            data: XAxis,
            borderColor: "black",
            borderWidth: 3,
            tension: 0.1,
            pointRadius: 0,
          },
          {
            label: "M [kNm]",
            data: newMoment,
            backgroundColor: "#ffe5e5",
            borderColor: "red",
            borderWidth: 1,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: t("result:bendingMomentDiagram"),
          },
        },
        // maintainAspectRatio: true,
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: false,
        //       },
        //     },
        //   ],
        // },
      },
    });

    let M = newMoment.map((value) => -value);

    // 5.3
    // Määritä funktio, jolla lasketaan taipuma integroimalla eteenpäin (vasemmalta tuesta) käyttämällä
    // puolisuunnikkaan muotoista sääntöä

    function calcDeflection(
      M: any[],
      EI: number,
      delX: number,
      theta_0: number | undefined,
      v_0: number
    ) {
      // console.log("M", M);
      let theta_im1: number | undefined;
      theta_im1 = theta_0;
      let v_im1 = v_0;
      let theta_i: number;
      let v_i: number;

      Rotation = new Array(X.length).fill(0);
      Rotation[supportIndexA] = theta_im1;
      Deflection = new Array(X.length).fill(0);
      Deflection[supportIndexA] = v_im1;

      for (let i = supportIndexA; i < X.length; i++) {
        const m = M[i];
        if (i > supportIndexA) {
          const M_im1 = M[i - 1];
          const M_i = M[i];
          const M_avg = 0.5 * (M_i + M_im1);

          if (theta_im1 !== undefined) {
            theta_i = theta_im1 + (M_avg / EI) * delX;
            v_i = v_im1 + 0.5 * (theta_i + theta_im1) * delX;
          } else {
            theta_i = (M_avg / EI) * delX;
            v_i = v_im1;
          }

          Rotation[i] = theta_i;
          Deflection[i] = v_i;

          theta_im1 = theta_i;
          v_im1 = v_i;
        }
      }

      return [Rotation, Deflection];
    }

    function zeroCrossing(
      Deflection: any[],
      guessStep: number,
      initRot: number,
      initDef: number
    ) {
      /**
       * Find the value of initial rotation that minimised deflection at right side
       * support by identifying where error crosses zero.
       */

      // If the deflection error is positive
      if (Deflection[supportIndexB] > 0) {
        let errorIsPositive = true; // Set flag for error sign

        // Keep testing lower initial rotation values until error turns NEGATIVE
        while (errorIsPositive) {
          initRot = initRot + guessStep;
          [Rotation, Deflection] = calcDeflection(
            M,
            EI,
            delX,
            initRot,
            initDef
          );

          // If error has turned NEGATIVE, switch the flag to allow loop to stop
          if (Deflection[supportIndexB] < 0) {
            errorIsPositive = false;
            solvedInitRotation = initRot; // Save the 'solved' value that minimised the error
          }
        }
      }
      // Else if deflection error is negative
      else if (Deflection[supportIndexB] < 0) {
        let errorIsPositive = false; // Set flag for error sign

        // Keep testing lower initial rotation values until error turns POSITIVE
        while (!errorIsPositive) {
          initRot = initRot + guessStep;
          [Rotation, Deflection] = calcDeflection(
            M,
            EI,
            delX,
            initRot,
            initDef
          );

          // If error has turned POSITIVE, switch the flag to allow loop to stop
          if (Deflection[supportIndexB] > 0) {
            errorIsPositive = true;
            solvedInitRotation = initRot; // Save the 'solved' value that minimised the error
          }
        }
      }

      return solvedInitRotation;
    }

    // Test whether reducing or increasing initial rotation leads to reduction in disp error at other support
    // Testaa, johtaako alkukierron vähentäminen tai lisääminen näyttövirheen vähenemiseen muussa tuessa
    let testDef = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      let r;
      if (i === 0) {
        r = initRot - deltaRot;
      } else if (i === 1) {
        r = initRot;
      } else if (i === 2) {
        r = initRot + deltaRot;
      }
      // console.log("(Calculator)r", r); // --> OK
      [Rotation, Deflection] = calcDeflection(M, EI, delX, r, initDef);
      testDef[i] = Deflection[supportIndexB];
    }

    if (Math.abs(testDef[0]) < Math.abs(testDef[1])) {
      // Need to test in the negative rotation direction by reducing the initial rotation guess
      console.log("Need to test in the negative direction");
      solvedInitRotation = zeroCrossing(
        Deflection,
        -deltaRot,
        initRot,
        initDef
      );
    } else if (Math.abs(testDef[2]) < Math.abs(testDef[1])) {
      // Need to test in the positive rotation direction by increasing the initial rotation guess
      // On testattava positiivisessa pyörimissuunnassa lisäämällä alkuperäistä pyörimisarvausta
      console.log("Need to test in the positive direction");
      solvedInitRotation = zeroCrossing(Deflection, deltaRot, initRot, initDef);
    }

    // Run the deflection calculation with the solved value of initial rotation
    // Suorita taipumalaskenta ratkaistulla alkukierron arvolla
    [Rotation, Deflection] = calcDeflection(
      M,
      EI,
      delX,
      solvedInitRotation,
      initDef
    );

    let theta_im1 = -solvedInitRotation; //Rotation on other side of support A
    let v_im1 = 0; //Vertical deflection at support A

    if (A !== 0) {
      console.log(
        "There is an overhand on the left side - solve for deflection by integrating in reverse direction"
      );
      const reverseRange = [];
      for (let i = supportIndexA - 1; i >= 0; i--) {
        reverseRange.push(i);
      }

      //Loop through data and integrate (Trapezoidal rule) - REVERSE DIRECTION
      for (let i = 0; i < reverseRange.length; i++) {
        const index = reverseRange[i];
        const M_im1 = M[index + 1]; //(300) - Assign previous value of M (reverse direction)
        const M_i = M[index]; //(299) - Assign current value of M (reverse direction)
        const M_avg = 0.5 * (M_i + M_im1);

        const theta_i = theta_im1 + (M_avg / EI) * delX; //Integrate moment values to get rotations
        const v_i = v_im1 + 0.5 * (theta_i + theta_im1) * delX; //Integrate rotation values to get displacements

        //Store data
        Rotation[index] = theta_i;
        Deflection[index] = v_i;

        //Update values for next loop iteration
        theta_im1 = theta_i;
        v_im1 = v_i;
      }
    }

    newDeflection = Deflection;

    dispatch(
      addDeflectionData({
        data: {
          labels: X,
          datasets: [
            {
              label: t("result:xAxel"),
              data: XAxis,
              borderColor: "black",
              borderWidth: 3,
              tension: 0.1,
              pointRadius: 0,
            },
            {
              label: "D [mm]",
              data: newDeflection,
              backgroundColor: "#D5F3FE",
              borderColor: "blue",
              borderWidth: 1,
              fill: true,
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: t("result:deflectionDiagram"),
            },
          },
          // maintainAspectRatio: true,
          // scales: {
          //   yAxes: [
          //     {
          //       ticks: {
          //         beginAtZero: false,
          //       },
          //     },
          //   ],
          // },
        },
      })
    );

    const maxDeflection = Math.max(...newDeflection);
    const minDeflection = Math.min(...newDeflection);

    // tuodaan funktion kautta Calculator-tiedostosta taulukko, jossa laskennan maksimiarvot.
    // tallennetaan ne results-stateen
    dispatch(
      addResult({
        S1: reactions[0].toFixed(2),
        S2: reactions[2].toFixed(2),
        Vmax: maxShearforce.toFixed(2),
        Vmin: minShearforce.toFixed(2),
        Mmax: maxMoment.toFixed(2),
        Mmin: minMoment.toFixed(2),
        Dmax: maxDeflection.toFixed(6),
        Dmin: minDeflection.toFixed(6),
      })
    );
  };
  return (
    <div className="App">
      {values.span !== "" && values.span !== 0 && !values.check ? (
        <>
          <Button variant="contained" onClick={CalculateForce}>
            {t("result:buttonCalculateResult")}
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default Calculator;
