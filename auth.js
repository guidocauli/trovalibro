// TrovaLibro - Biblioteca Diffusa - Guido Cauli <guido.cauli@gmail.com>


// Autenticazione/autorizzazione tramite express-session.     
// Il project work usa le sessioni lato server (cookie httpOnly) 

function requireAuth(req, res, next) { //utenti regolari
    if (!req.session || !req.session.userId) {  
        return res.status(401).json({ error: 'Accesso utente richiesto. Effettua il login.' });
    }
    next();
}


function requireAdmin(req, res, next) { // accesso per soli Amministratori
    if (!req.session || req.session.role !== 'admin') {
        return res.status(403).json({ error: 'Operazione riservata agli amministratori.' }); 
    }  
    next();
}


// Espone 'req.session' per usi facoltativi (es. tracciare le visualizzazioni con 'viewer_id' se loggati).

function attachSession(req, res, next) { 
    res.locals.isAuthenticated = !!(req.session && req.session.userId); 
    next();
}


module.exports = { requireAuth, requireAdmin, attachSession };


