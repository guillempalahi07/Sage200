<?php
// Comptador senzill de visites a la pàgina, basat en un fitxer de text.
header('Content-Type: application/json');

$fitxer = __DIR__ . '/visites.txt';

if (!file_exists($fitxer)) {
    file_put_contents($fitxer, '0');
}

$visites = (int) file_get_contents($fitxer);
$visites++;
file_put_contents($fitxer, (string) $visites);

echo json_encode(['visites' => $visites]);
