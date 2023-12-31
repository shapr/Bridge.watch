import { h, Component } from "preact";
import htm from "htm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import BookIcon from "@mui/icons-material/Book";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import KofiButton from "kofi-button";
import background from "../../assets/blue_wallpaper.webp";
const html = htm.bind(h);

export default function Footer() {
  return html`
<${Box} sx=${{
    flexGrow: 1,
    padding: 2,
    boxShadow: 3,
    bgcolor: "primary.main",
    color: "primary.contrastText",
    backgroundImage: `url(${background})`,
    backgroundSize: "150px auto",
  }} >
  
  <${Container} maxWidth="lg">
    <${Grid} container sx=${{ padding: 2 }} spacing=${3}>
      <${Grid} item xs=${12} sm=${4}>
        <${Typography} variant="h6" style=${"text-shadow: #000 1px 0 10px"} >Bridge.watch</${Typography}>
        <${Typography} style=${"text-shadow: #000 1px 0 10px"} variant="body1" >
          Bridge.watch provides interactive data visualization for open-access data records from the FHWA of bridges located in the United States.
        </${Typography}>
      </${Grid}>
      <${Grid} item xs=${12} sm=${4}>
        <${Typography} style=${"text-shadow: #000 1px 0 10px"} variant="h6">License</${Typography}>
        <${Typography} style=${"text-shadow: #000 1px 0 10px"}  variant="body1">
        This work is licensed under a <${Link} style=${"text-shadow: #000 1px 0 10px"}
                                               variant="body1"
                                               underline="hover"
                                               color="inherit"
                                               href="https://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons-Attribution-Non Commercial-Share Alike 4.0 License</${Link}>. Contact the author for more information.
        </${Typography}>
      </${Grid}>
      <${Grid} item xs=${12} sm=${4}>
        <${Grid} container>
          <${Grid} item xs=${12}>
            <${Typography} style=${"text-shadow: #000 1px 0 10px"} variant="h6" >Contact</${Typography}>
            <${Typography}  style=${"text-shadow: #000 1px 0 10px"} variant="body1">Maryanne Wachter</${Typography}>
          </${Grid}>
          <${Grid} sx=${{ pt: 1 }} container spacing=${2}>
            <${Grid} item>
              <${Link} href="mailto:m.wachter@utsv.net"
                       target="_blank"}>
                <${EmailIcon} style=${"filter:drop-shadow: #000 1px 0 10px"} sx=${{
    color: "common.white",
  }}/>
              </${Link}>
            </${Grid}>
            <${Grid} item>
              <${Link} href="https://www.linkedin.com/in/m-wachter/"
                       target="_blank"}>
                <${LinkedInIcon} sx=${{ color: "common.white" }}/>
              </${Link}>
            </${Grid}>
            <${Grid} item>
              <${Link} href="https://twitter.com/eng_mclare"
                       target="_blank"}>
                <${TwitterIcon} sx=${{ color: "common.white" }}/>
              </${Link}>
            </${Grid}>
            <${Grid} item>
              <${Link} href="https://github.com/m-clare"
                       target="_blank"}>
                <${GitHubIcon} sx=${{ color: "common.white" }}/>
              </${Link}>
            </${Grid}>
            <${Grid} item>
              <${Link} href="https://mclare.blog"
                       target="_blank"}>
                <${BookIcon} sx=${{ color: "common.white" }}/>
              </${Link}>
            </${Grid}>
          </${Grid}>
          <${Grid} item xs=${12}>
          </${Grid}>
        </${Grid}>
      </${Grid}>
      <${Grid} item xs=${12}>
        <${Divider} sx=${{ borderColor: "common.white" }}/>
      </${Grid}>
      <${Grid} item xs=${12} md=${4} sx=${{
    textAlign: { xs: "center", md: "left" },
  }} style=${{ paddingTop: "8px" }}>
      <${KofiButton} color="#c44436" kofiID="mclare" title="Support this project" />
      </${Grid}>
      <${Grid} item xs=${12} md=${4} style=${{ paddingTop: "8px" }}>
          <p 
            style=${"font-size: 0.8rem; text-align: center; text-shadow: #000 1px 0 10px"}>
            All rights reserved © UTSV, 2021
          </p>
      </${Grid}>
      <${Grid} item xs=${12} md=${4} sx=${{
    textAlign: { xs: "center", md: "right" },
  }} style=${{ paddingTop: "8px" }}>
        <style>@font-face {  font-family: 'Open Sans';  font-style: normal;  font-weight: 400;  src: local('Open Sans'), local('OpenSans'), url('data:font/woff2;base64,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') format('woff2');}@font-face {  font-family: 'Open Sans';  font-style: normal;  font-weight: 700;  src: local('Open Sans Bold'), local('OpenSans-Bold'), url('data:font/woff2;base64,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') format('woff2');}.rc-pill {  font-family: 'Open Sans', sans-serif;  border-radius: 4px;  display: inline-block;  position: relative;  overflow: hidden;  white-space: nowrap;  font-size: 11px;  cursor: pointer;}.rc-pill strong {  font-weight: bold;}.rc-pill a {  color: white;  text-shadow: rgba(1, 1, 1, 0.3) 0.75px 0.75px 0px;}.rc-pill div {  display: inline-block;  padding: 2px 5px 2px 5px;}.rc-pill .l {  background: #555;  background: -webkit-linear-gradient(#555, #484848);  background: linear-gradient(#555, #484848);}.rc-pill .r {  background: #61ae24;  background: -webkit-linear-gradient(#61ae24, #559920);  background: linear-gradient(#61ae24, #559920);}.rc-pill i.icon-svg svg {  height: 1em;  margin-right: 0.33em;  margin-bottom: -1px;  display: inline-block;}</style><div class="rc-pill" style=${"float: center; margin-top: 0px;"}><a href="http://www.recurse.com" title="Made at the Recurse Center"><div class="l"><span>made at </span></div><div class="r"><i class="icon-svg"><svg viewBox="0 0 12 15"><rect x="0" y="0" width="12" height="10" fill="black"></rect><rect x="1" y="1" width="10" height="8" fill="white"></rect><rect x="2" y="2" width="8" height="6" fill="black"></rect><rect x="2" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="4" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="6" y="3" width="1" height="1" fill="#61ae24"></rect><rect x="3" y="5" width="2" height="1" fill="#61ae24"></rect><rect x="6" y="5" width="2" height="1" fill="#61ae24"></rect><rect x="4" y="9" width="4" height="3" fill="black"></rect><rect x="1" y="11" width="10" height="4" fill="black"></rect><rect x="0" y="12" width="12" height="3" fill="black"></rect><rect x="2" y="13" width="1" height="1" fill="white"></rect><rect x="3" y="12" width="1" height="1" fill="white"></rect><rect x="4" y="13" width="1" height="1" fill="white"></rect><rect x="5" y="12" width="1" height="1" fill="white"></rect><rect x="6" y="13" width="1" height="1" fill="white"></rect><rect x="7" y="12" width="1" height="1" fill="white"></rect><rect x="8" y="13" width="1" height="1" fill="white"></rect><rect x="9" y="12" width="1" height="1" fill="white"></rect></svg></i><span>Recurse Center</span></div></a></div>
        </${Grid}>
    </${Grid}>
  </${Container}>
</${Box}>
  `;
}
