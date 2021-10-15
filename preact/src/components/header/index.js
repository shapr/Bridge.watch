import { h, Component } from "preact";
import htm from "htm";
import { Link } from "preact-router/match";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const html = htm.bind(h);

export default function Header() {
  return html`
      <${Box} sx=${{ flexGrow: 1 }}>
      <${AppBar} position="static">
      <${Toolbar}>
      <${IconButton} size="medium" edge="start" color="inherit" aria-label="menu"
       sx=${{ mr: 2 }}>
      <${MenuIcon} />
      </${IconButton}>
      <${Typography} variant="h6" component="div" sx=${{ flexGrow: 1 }}>
      Bridge.watch
    </${Typography}>
      <${Button} color="inherit"><${Link} href="/country">Country</${Link}></${Button}>
      </${Toolbar}>
      </${AppBar}>
      </${Box}>`;
}