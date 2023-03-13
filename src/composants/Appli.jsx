import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import FrmDossier from './FrmDossier';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';

export default function Appli() {
  const [frmDossierOuvert, setFrmDossierOuvert] = useState(false);

  // État des dossiers de l'utilisateur
  /*
    Structure de la variable dossiers : 
    [
      {
        id: '4356345673.435673475', 
        titre: 'Politique et économie', 
        couverture: 'http://fdhshfdshkd.com/img.png', 
        couleur: '#600', 
        dateModif: 546739569346593
      },
      {id: '576756756.6376568', titre: 'Théâtre', couverture: 'http://fdhshfdshkd.com/img.png', couleur: '#600', dateModif: '2023-03-01t12:43:67.234z'},
      {id: '2545345.78478', titre: 'Philosophie', couverture: 'http://fdhshfdshkd.com/img.png', couleur: '#600', dateModif: '2023-03-01t12:43:67.234z'},
      {id: '778678676.96798678678', titre: 'Mathématiques', couverture: 'http://fdhshfdshkd.com/img.png', couleur: '#600', dateModif: '2023-03-01t12:43:67.234z'}

    ]
  */
  const [dossiers, setDossiers] = useState(
    () => JSON.parse(localStorage.getItem('4pa-dossiers')) || []
  );

  useEffect(
    () => localStorage.setItem('4pa-dossiers', JSON.stringify(dossiers))
    , [dossiers]
  );

  function ouvrirFrmDossier() {
    setFrmDossierOuvert(true);
  }

  function ajouterDossier(id, titre, couverture, couleur, timestamp) {
    setDossiers([...dossiers,
      {
        id: id,
        titre: titre,
        couverture: couverture,
        couleur: couleur,
        dateModif: timestamp
      }
    ]);
  }

  return (
    <div className="Appli">
        <Entete />
        <section className="contenu-principal">
          <ListeDossiers dossiers={dossiers} setDossiers={setDossiers} />
          
          <FrmDossier ouvert={frmDossierOuvert} setOuvert={setFrmDossierOuvert} actionDossier={ajouterDossier}/>
          
          <Fab onClick={ouvrirFrmDossier} size="large" className="ajoutDossier" color="secondary" aria-label="Ajouter dossier">
            <AddIcon />
          </Fab>
        </section>
    </div>
  );
}
