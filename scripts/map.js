export var MapModule = {
  chartInstance: null,

  init: function () {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    this.initMap();
  },

  initMap: function () {
    am4core.ready(() => {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.create("chartdiv", am4maps.MapChart);
      this.chartInstance = chart;

      chart.geodata = am4geodata_brazilLow;
      chart.projection = new am4maps.projections.Mercator();
      chart.panBehavior = "move";
      chart.maxZoomLevel = 1;
      chart.fontFamily = "Poppins";
      chart.tooltipContainer.fontFamily = "Poppins";
      chart.tooltipContainer.fontSize = 12;
      chart.logo.disabled = true;

      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      polygonSeries.mapPolygons.template.tooltipText = "{name}";
      polygonSeries.mapPolygons.template.fill = am4core.color("#003366");
      polygonSeries.mapPolygons.template.stroke = am4core.color("#ffffff");
      polygonSeries.mapPolygons.template.strokeWidth = 2;
      polygonSeries.mapPolygons.template.strokeOpacity = 0.5;

      const hoverState = polygonSeries.mapPolygons.template.states.create("hover");
      hoverState.properties.fill = am4core.color("#0050a0");
      hoverState.properties.stroke = am4core.color("#ffffff");
      hoverState.properties.strokeWidth = 1.5;

      polygonSeries.mapPolygons.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      polygonSeries.mapPolygons.template.events.on("hit", function (ev) {
        const ufId = ev.target.dataItem.dataContext.id;
        const ufCode = MapModule.ufMap[ufId];
        if (ufCode) {
          MapModule.loadMunicipios(chart, ufCode);
        }
      });

      const backButton = chart.createChild(am4core.Button);
      backButton.label.text = "Voltar ao Brasil";
      backButton.align = "left";
      backButton.valign = "top";
      backButton.marginTop = 10;
      backButton.marginLeft = 10;
      backButton.events.on("hit", function () {
        chart.series.clear();
        chart.geodata = am4geodata_brazilLow;
        MapModule.init();
      });
      backButton.hide();

      const labelSeries = chart.series.push(new am4maps.MapImageSeries());
      const labelTemplate = labelSeries.mapImages.template;
      labelTemplate.propertyFields.latitude = "latitude";
      labelTemplate.propertyFields.longitude = "longitude";

      const stateLabel = labelTemplate.createChild(am4core.Label);
      stateLabel.text = "{label}";
      stateLabel.fill = am4core.color("#ffffff");
      stateLabel.fontSize = 10;
      stateLabel.horizontalCenter = "middle";
      stateLabel.verticalCenter = "middle";
      stateLabel.nonScaling = true;
      stateLabel.fontWeight = "600";
      stateLabel.fontFamily = "Poppins";

      labelSeries.data = [
        { label: "AC", latitude: -9.02, longitude: -70.81 },
        { label: "AL", latitude: -9.72, longitude: -36.42 },
        { label: "AM", latitude: -4.07, longitude: -63.80 },
        { label: "AP", latitude: 1.41, longitude: -51.77 },
        { label: "BA", latitude: -12.56, longitude: -41.68 },
        { label: "CE", latitude: -5.20, longitude: -39.30 },
        { label: "DF", latitude: -15.77, longitude: -47.76 },
        { label: "ES", latitude: -19.51, longitude: -40.49 },
        { label: "GO", latitude: -15.98, longitude: -49.86 },
        { label: "MA", latitude: -5.42, longitude: -45.44 },
        { label: "MG", latitude: -18.40, longitude: -44.10 },
        { label: "MS", latitude: -20.51, longitude: -54.64 },
        { label: "MT", latitude: -13.42, longitude: -55.52 },
        { label: "PA", latitude: -4.89, longitude: -52.48 },
        { label: "PB", latitude: -7.12, longitude: -36.00 },
        { label: "PE", latitude: -8.38, longitude: -37.86 },
        { label: "PI", latitude: -8.08, longitude: -42.98 },
        { label: "PR", latitude: -24.59, longitude: -51.65 },
        { label: "RJ", latitude: -22.44, longitude: -42.65 },
        { label: "RN", latitude: -5.71, longitude: -36.59 },
        { label: "RO", latitude: -11.22, longitude: -62.80 },
        { label: "RR", latitude: 2.25, longitude: -61.47 },
        { label: "RS", latitude: -29.70, longitude: -53.50 },
        { label: "SC", latitude: -27.33, longitude: -49.90 },
        { label: "SE", latitude: -10.57, longitude: -37.35 },
        { label: "SP", latitude: -22.19, longitude: -48.78 },
        { label: "TO", latitude: -10.37, longitude: -48.29 }
      ];

      MapModule.backButton = backButton;
    });
  },

  loadMunicipios: function (chart, ufCode) {
    fetch(`https://servicodados.ibge.gov.br/api/v2/malhas/${ufCode}?formato=application/vnd.geo+json&resolucao=5&intrarregiao=municipio`)
      .then(response => {
        if (!response.ok) throw new Error("Erro ao carregar GeoJSON");
        return response.json();
      })
      .then(geojson => {
        chart.series.clear();
        const municipioSeries = chart.series.push(new am4maps.MapPolygonSeries());
        municipioSeries.geodata = geojson;
        municipioSeries.useGeodata = true;

        municipioSeries.mapPolygons.template.tooltipText = "{name}";
        municipioSeries.mapPolygons.template.fill = am4core.color("#004080");
        municipioSeries.mapPolygons.template.stroke = am4core.color("#ffffff");
        municipioSeries.mapPolygons.template.strokeWidth = 0.5;

        chart.zoomToMapObject(municipioSeries);
        MapModule.backButton.show();
      })
      .catch(err => {
        alert("Erro ao carregar municípios: " + err.message);
      });
  },

  ufMap: {
    "BR-AC": 12,
    "BR-AL": 27,
    "BR-AM": 13,
    "BR-AP": 16,
    "BR-BA": 29,
    "BR-CE": 23,
    "BR-DF": 53,
    "BR-ES": 32,
    "BR-GO": 52,
    "BR-MA": 21,
    "BR-MG": 31,
    "BR-MS": 50,
    "BR-MT": 51,
    "BR-PA": 15,
    "BR-PB": 25,
    "BR-PE": 26,
    "BR-PI": 22,
    "BR-PR": 41,
    "BR-RJ": 33,
    "BR-RN": 24,
    "BR-RO": 11,
    "BR-RR": 14,
    "BR-RS": 43,
    "BR-SC": 42,
    "BR-SE": 28,
    "BR-SP": 35,
    "BR-TO": 17
  },

  bindEvents: function () {
    //
  }
};
