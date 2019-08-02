const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const listaDoces = require('./doces');
const listaArtesanato = require('./artesanato');

db.serialize(()=>{
    db.run(`
        CREATE TABLE IF NOT EXISTS doces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(40) NOT NULL,
            sabor VARCAHR(40) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            foto TEXT
        )
    `);

    for(let doceTipo in listaDoces) {
        listaDoces[doceTipo].forEach(doce => {
            db.all(`SELECT * FROM doces WHERE 
            nome='${doce.nome}' AND
            sabor='${doce.sabor}' AND
            descricao='${doce.descricao}' AND
            foto='${doce.foto}'`, [], function(err, row) {
                if(err) {
                    console.log('erro ao buscar DOCES existentes!');
                    return;
                }
                if(!row.length) {
                    db.run(`
                        INSERT INTO doces (
                            nome, 
                            sabor,
                            descricao,
                            foto
                        ) VALUES (?, ?, ?, ?)`,[
                            doce.nome,
                            doce.sabor,
                            doce.descricao,
                            doce.foto
                        ],
                        function n(error) {
                            if(error) console.log(error.message);
                        }
                    );
                }
            });
        });
    }

    db.each("SELECT * FROM doces", (err, doce) => {
        console.log(doce);
    });

});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS artesanato (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome VARCHAR(40) NOT NULL,
            sabor VARCAHR(40) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            foto TEXT
        )
    `);

    for (let artesanatoTipo in listaArtesanato) {
        listaArtesanato[artesanatoTipo].forEach(art => {
            db.all(`SELECT * FROM artesanato WHERE
                nome='${art.nome}' AND
                sabor='${art.sabor}' AND
                descricao='${art.descricao}' AND
                foto='${art.foto}'`, [], function (err, row) {
                    if(err) {
                        console.log('erro ao buscar ARTESANATO existentes!');
                        return;
                    }
                    if(!row.length) {
                    db.run(`
                    INSERT INTO artesanato (
                        nome, 
                        sabor,
                        descricao,
                        foto
                        ) VALUES (?, ?, ?, ?)`,[
                            art.nome,
                            art.sabor,
                            art.descricao,
                            art.foto
                        ],
                        function n(error) {
                            if(error) console.log(error.message);
                        }
                    );
                }
            });
        });
    }

    db.each("SELECT * FROM artesanato", (err, art) => {
        console.log(art);
    });
});


process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;