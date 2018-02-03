<?php
if ($_REQUEST['pa']=='final7')
{
  $foto="assets/images/final7icon.png";
}
if ($_REQUEST['pa']=='final8')
{
  $foto="assets/images/final8icon.png";
}
if ($_REQUEST['pa']=='final10')
{
  $foto="assets/images/final10icon.png";
}
if ($_REQUEST['pa']=='final102')
{
  $foto="assets/images/final102icon.png";
}
if ($_REQUEST['pa']=='final13')
{
  $foto="assets/images/final13icon.png";
}
if ($_REQUEST['pa']=='chocobo')
{
  $foto="assets/images/chocobitoicon.png";
}

$xml="<?xml version=\"1.0\"?>\n";
$xml.="<pais>\n";
$xml.="<foto>$foto</foto>\n";
$xml.="</pais>\n";
header('Content-Type: text/xml');
echo $xml;

?>