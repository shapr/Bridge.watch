import { h } from "preact";
import htm from "htm";
import { getNationalBridges } from "../../utils/nbi-api";
import { useEffect, useState, useRef } from "preact/hooks";
import { StaticHexbinChart } from "../../components/StaticHexbinMap";
import { isEmpty } from "lodash-es";
import { isEqual } from "lodash-es";
import { makeStyles } from "@mui/styles";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import useWindowDimensions from "../../components/windowDimensions";

import { LocaleDescription } from "../../components/localeDescription";
import { QueryForm } from "../../components/queryForm";
import { DetailedForm } from "../../components/detailedForm";
import {
  singleFilters,
  multiFilters,
  filterMaps,
  detailedQueryMaps,
  validRanges,
  plotOptions,
} from "../../components/options";
import { constructURI, fixDateData } from "../../components/helperFunctions";

const html = htm.bind(h);

const countryFilters = (({ material, type, service, service_under }) => ({
  material,
  type,
  service,
  service_under,
}))(multiFilters);

function isPositiveInt(val) {
  return /^\d+$/.test(val);
}

export default function CountryBridges() {
  const [bridges, setBridges] = useState({});
  const [queryState, setQueryState] = useState({
    plot_type: "percent_poor",
    material: [],
    type: [],
    service: [],
    service_under: [],
  });
  const [detailedQueryState, setDetailedQueryState] = useState({
    rating: [],
    deck_type: [],
    deck_surface: [],
    rangeFilters: {
      year_built: { min: "", max: "" },
      traffic: { min: "", max: "" },
      bridge_length: { min: "", max: "" },
      span_length: { min: "", max: "" },
    },
  });
  const [queryURI, setQueryURI] = useState("plot_type=percent_poor");
  const [submitted, setSubmitted] = useState(true);
  const [hexSize, setHexSize] = useState(true);
  const [plotType, setPlotType] = useState(queryState.plot_type);
  const [waiting, setWaiting] = useState(false);
  const [desktopView, setDesktopView] = useState(true);

  const queryDicts = {
    plotOptions: plotOptions,
    filterMaps: filterMaps,
    detailedQueryMaps: detailedQueryMaps,
  };

  const heightCheck = useMediaQuery("(min-height:500px)");

  const { deviceWidth, deviceHeight } = useWindowDimensions();

  const handleSingleChange = (event, type) => {
    const value = event.target.value;
    setQueryState({ ...queryState, [type]: value });
    const newURI = constructURI(
      { ...queryState, [type]: value },
      detailedQueryState,
      queryDicts
    );
    if (newURI !== queryURI) {
      setSubmitted(true);
      setWaiting(true);
    }
    if (plotType !== value) {
      setPlotType(value);
    }
  };

  const handleRangeChange = (event, type, extrema, validRange) => {
    const value = event.target.value;
    const minValue = detailedQueryState.rangeFilters[type].min;
    const maxValue = detailedQueryState.rangeFilters[type].max;
    // Validation for year, positive number otherwise
    if (
      ((type === "year_built" && value.length === 4) ||
        (type !== "year_built" && value.length >= 1)) &&
      isPositiveInt(value)
    ) {
      let inputValue;
      if (value > validRange.max) {
        inputValue = parseInt(validRange.max);
      } else if (value < validRange.min) {
        inputValue = parseInt(validRange.min);
      } else if (
        extrema === "min" &&
        maxValue !== "" &&
        maxValue !== null &&
        value > maxValue
      ) {
        inputValue = parseInt(maxValue);
      } else if (
        extrema === "max" &&
        minValue !== "" &&
        minValue !== null &&
        value < minValue
      ) {
        inputValue = parseInt(minValue);
      } else if (value === null || value === "") {
        inputValue = "";
      } else {
        inputValue = value;
      }
      const newNumberFilters = {
        ...detailedQueryState.rangeFilters[type],
        [extrema]: inputValue,
      };
      const detailedRanges = {
        ...detailedQueryState.rangeFilters,
        [type]: newNumberFilters,
      };
      setDetailedQueryState({
        ...detailedQueryState,
        rangeFilters: detailedRanges,
      });
    }
  };

  const handleFormClose = (event) => {
    const newURI = constructURI(queryState, detailedQueryState, queryDicts);
    if (newURI !== queryURI) {
      setSubmitted(true);
    }
  };

  const handleClick = (event) => {
    const clearedQueryState = {
      ...queryState,
      material: [],
      type: [],
      service: [],
      service_under: [],
    };
    setQueryState(clearedQueryState);
    const newURI = constructURI(
      clearedQueryState,
      detailedQueryState,
      queryDicts
    );
    if (newURI !== queryURI) {
      setSubmitted(true);
    }
  };

  const handleSubmitClick = (event) => {
    const newURI = constructURI(queryState, detailedQueryState, queryDicts);
    if (newURI !== queryURI) {
      setSubmitted(true);
    }
  };

  const handleClearClick = (event) => {
    const emptyDetailedFilters = {
      rating: [],
      deck_type: [],
      deck_surface: [],
      rangeFilters: {
        year_built: { min: "", max: "" },
        traffic: { min: "", max: "" },
        bridge_length: { min: "", max: "" },
        span_length: { min: "", max: "" },
      },
    };
    setDetailedQueryState(emptyDetailedFilters);
    const newURI = constructURI(queryState, emptyDetailedFilters, queryDicts);
    if (newURI !== queryURI) {
      setSubmitted(true);
    }
  };

  useEffect(async () => {
    const newURI = constructURI(queryState, detailedQueryState, queryDicts);
    let bridgeData = await getNationalBridges(newURI);
    console.log(bridgeData);
    setQueryURI(newURI);
    if (queryState.plot_type === "future_date_of_inspection") {
      bridgeData = fixDateData(bridgeData, "hexBin");
    }
    setBridges(bridgeData);
    setSubmitted(false);
    setWaiting(false);
  }, [submitted]);

  const renderPlotType = plotType;
  const renderSubmitted = submitted;
  const scaledHexBool = hexSize;
  const renderWaiting = waiting;
  const locality = "the U.S.";

  const colWidth = { single: 3, multi: 3 };

  return html`
<${Box} sx=${{ padding: [0, 3], pt: [2, 3], pb: [2, 3] }}>
  <${Container} maxWidth="lg">
    <${Grid} container spacing=${[2, 3]}>
      <${Grid} item xs=${12}>
        <${Paper} sx=${{ padding: 3 }}>
          <${Grid} container spacing=${3}>
            <${Grid} item xs=${12}>
              <${Typography} variant="h3" component="h1">U.S. Bridges</${Typography}>
            </${Grid}>
            <${QueryForm} queryState=${queryState}
                          stateInfo=${{
                            state: queryState,
                            setState: setQueryState,
                            setWaiting: setWaiting,
                            routeType: "country",
                          }}
                          handleClose=${handleFormClose}
                          handleSingleChange=${handleSingleChange}
                          submitted=${renderSubmitted}
                          plotChoices=${singleFilters.plot_type}
                          filters=${countryFilters}
                          handleClick=${handleClick}
                          colWidth=${colWidth}
                          />
           <${Grid} item xs=${12}>
           <${DetailedForm} detailedQueryState=${detailedQueryState}
                            handleRangeChange=${handleRangeChange}
                            handleSubmitClick=${handleSubmitClick}
                            handleClearClick=${handleClearClick}
                            validRanges=${validRanges}
                            submitted=${renderSubmitted}
                            />
           </${Grid}>
          </${Grid}>
        </${Paper}>
      </${Grid}>
      ${
        renderSubmitted
          ? html`<${Grid} item xs=${12}>
        <${Paper} sx=${{ padding: 2 }}>
          <${Grid} container>
            <${Grid} item xs=${12}>
              <${Typography} style=${"text-align: center"}
                             variant="h6"
                             color=${grey[500]}>
                <i>Loading query...</i>
                  </${Typography}>
              <${LinearProgress} />
            </${Grid}>
          </${Grid}>
        </${Paper}>
      </${Grid}>`
          : null
      }
      ${
        !isEmpty(bridges) && !bridges.hasOwnProperty("message")
          ? html`<${LocaleDescription}
                summaryType=${renderPlotType}
                keyValues=${{
                  field: renderPlotType,
                  count: bridges.keyData.count,
                  locality: locality,
                  filters: queryState,
                }}
                waiting=${renderWaiting}
                submitted=${renderSubmitted}
              />
              <${StaticHexbinChart}
                bridgeData=${bridges}
                plotType=${renderPlotType}
                hexSize=${scaledHexBool}
                submitted=${submitted}
                heightCheck=${heightCheck}
              /> `
          : null
      }
      ${
        !renderSubmitted && bridges.hasOwnProperty("message")
          ? html`<${Grid} item xs=${12}>
        <${Paper} sx=${{ padding: 2 }}>
          <${Grid} container>
            <${Grid} item xs=${12}>
              <${Typography} style=${"text-align: center"}
                             variant="h6"
                             color=${grey[500]}>
                <i>${bridges.message}</i>
              </${Typography}>
            </${Grid}>
          </${Grid}>
        </${Paper}>
      </${Grid}>`
          : null
      }
    </${Grid}>
  </${Container}>
</${Box}>`;
}
