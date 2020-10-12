<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Fnope.db.png" width="250" height="100" alt="nope.db" />

[![nope.db](https://img.shields.io/badge/nope-db-black.svg)](https://www.npmjs.org/package/nope.db)
[![npm version](https://img.shields.io/npm/v/nope.db.svg?style=flat-square)](https://www.npmjs.org/package/nope.db)
[![install size](https://packagephobia.now.sh/badge?p=nope.db)](https://packagephobia.now.sh/result?p=nope.db)
[![npm downloads](https://img.shields.io/npm/dm/nope.db.svg?style=flat-square)](http://npm-stat.com/charts.html?package=nope.db)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/jesuswasmychoice/nope.db/blob/main/LICENSE)
[![discord](https://img.shields.io/discord/747043879726874734?color=%237289DA&label=Discord)](https://discord.gg/trDF8fb)

<br>

> Node.js için basit, kullanışlı JSON database.

---

- Yenilikler (0.0.5-Beta):
  - [unPush()](#unPush) methodu sonsuza kadar kaldırıldı.
  - [arrayHas()](#arrayHas) methodu sonsuza kadar kaldırıldı.
  - Methodların açıklamaları eklendi.
  - [README.md](#readme.md) dosyası güncellendi.
  - [Destek adresleri](#support) eklendi.

---

---

<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Fkurulum.png" width="160" height="60" alt="Kurulum" />

[![NPM](https://nodei.co/npm/nope.db.png?downloads=true&stars=true)](https://nodei.co/npm/nope.db/)

```console
$ npm install nope.db
```

<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Ftan%C4%B1mlama.png" width="160" height="60" alt="Tanımlama" />

```js
const db = require("nope.db");
```

<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Fdestek.png" width="150" height="75" alt="Destek" />

> [Destek adreslerine gitmek için tıkla](#support)

---

<img src="https://cdn.glitch.com/224c8078-ad94-4e2c-9def-73ccac926363%2Fmethods.png" width="160" height="60" alt="Methodlar" />

- [.get()](#get)
  - [.fetch()](#get)
- [.set()](#set)
- [.delete()](#delete)
  - [.remove()](#delete)
- [.push()](#push)
- [.add()](#add)
- [.subtract()](#subtract)
- [.has()](#has)
- [.all()](#all)
- [.clear()](#clear)
- [.backup()](#backup)
- [.loadBackup()](#loadBackup)

<div id="get">

---

- [.get()](#get) Methodu Örnekleri:
> [.get()](#get) methodunda, database'den girdiğiniz id'ye ait olan veriyi çeker.
```js
/*
Database'deki veri:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  }
}
*/

db.get('test'); // -> "hello"
db.get('testing'); // -> { nope: 'db' }
db.get('testing.nope'); // -> "db"
```
</div>

---

<div id="set">

---

- [.set()](#set) Methodu Örnekleri:
> [.set()](#set) methodunda, girdiğiniz değeri database'de ait olan id'ye kaydeder.

```js
db.set('test', 'hello'); // -> "hello"
db.set('testing', { nope: 'db' }); // -> { nope: "db" }
db.set('nope.db', ["hi"]); // -> ["hi"]
db.set('bank.nopeion.money', 500); // -> 500

/*
Elde edilen veri:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  },
  "nope": {
    "db": [
      "hi"
    ]
  },
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/
```

</div>

---

<div id="delete">

---

- [.delete()](#delete) Methodu Örnekleri:
> [.delete()](#delete) methodunda, girdiğiniz id'yi database'den siler.

```js
/*
Silinmeden önce database'deki veri:

{
  "test": "hello",
  "testing": {
    "nope": "db"
  },
  "nope": {
    "db": [
      "hi"
    ]
  },
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/

db.delete('test'); // -> true
db.delete('testing.nope'); // -> true
db.delete('nope'); // -> true
db.delete('hello'); // -> false
db.delete('bank.nopeion.test'); // -> true

/*
Silindikten sonra database'deki veri:

{
  "testing": {},
  "bank": {
    "nopeion": {
      "money": 500
    }
  }
}
*/
```

</div>

---

<div id="push">

---

- [.push()](#push) Methodu Örnekleri:
> [.push()](#push) methodunda, girdiğiniz id'ye ait olan verideki array'in içine, girmiş olduğunuz değeri ekler.

```js
db.push('test', 'nope.db'); // -> [ 'nope.db' ]
db.push('test', 'hello'); // -> [ 'nope.db', 'hello' ]
db.push('testing', { name: 'nope.db', version: 'beta' }); // -> [ { name: 'nope.db', version: 'beta' } ]
db.push('testing', { name: 'nopeion', version: 'alpha' }); // -> [ { name: 'nopeion', version: 'alpha' } ]
db.push('nopeion.testing', { number: 1, date: Date.now().toString() }); // -> [ { number: 1, date: 1602549127632 } ]
db.push('nopeion.testing', { number: 2, date: Date.now().toString() }); // -> [ { number: 2, date: 1602549127637 } ]

/*
Database'e kaydedilen veri:

{
  "test": [
    "nope.db",
    "hello"
  ],
  "testing": [
    {
      "name": "nope.db",
      "version": "beta"
    },
    {
      "name": "nopeion",
      "version": "alpha"
    }
  ],
  "nopeion": {
    "testing": [
      {
        "number": 1,
        "date": "1602549127632"
      },
      {
        "number": 2,
        "date": "1602549127637"
      }
    ]
  }
}
*/
```

</div>

---

<div id="add">

---

- [.add()](#add) Methodu Örnekleri:
> [.add()](#add) methodunda, girmiş olduğunuz id'deki sayı ile girmiş olduğuz değeri toplar ve kaydeder.

```js
/*
Database'deki veri:

{
  "bank": {
      nopeion: {
          money: 50
      }
  }
}
*/

db.add('bank.nopeion.money', 50); // -> 100
db.add('bank.nopeion.money', 400); // -> 500
```

</div>

---

<div id="subtract">

---

- [.subtract()](#subtract) Methodu Örnekleri:
> [.subtract()](#subtract) methodunda, girmiş olduğunuz id'deki sayıdan ile girmiş olduğuz değeri çıkarır ve kaydeder.

```js
/*
Database'deki veri:

{
  "bank": {
      nopeion: {
          money: 500
      }
  }
}
*/

db.subtract('bank.nopeion.money', 50); // -> 450
db.subtract('bank.nopeion.money', 400); // -> 50
```

</div>

---

<div id="has">

---

- [.has()](#has) Methodu Örnekleri:
> [.has()](#has) methodunda girdiğiniz id'yi database'den kontrol eder.

```js
/*
Database'deki veri:

{
  "nopeion": {
    "money": 800
  },
  "test": {
    "money": 250
  }
}
*/

db.has('nopeion.money'); // -> true
db.has('nopeion.password'); // -> false
db.has('test'); // -> true
db.has('testing'); // -> false
```

</div>

---

<div id="all">

---

- [.all()](#all) Methodu Örnekleri:
> [.all()](#all) methodu, database'deki tüm veriyi çeker.

```js
/*
Database'deki veri:

{
  "nope": {
    "db": [
      "testing",
      "hello"
    ]
  },
  "test": [
    "nope.db"
  ],
  "testing": [
    {
      "name": "nope.db",
      "version": "beta"
    }
  ],
  "nopeion": {
    "testing": [
      {
        "number": 2,
        "date": "1602520473968"
      }
    ]
  }
}
*/

db.all() //-> { nope: { db: [ 'testing', 'hello' ] }, test: [ 'nope.db' ], testing: [ { name: 'nope.db', version: 'beta' } ], nopeion: { testing: [ [Object] ] } }
```

</div>

---

<div id="clear">

---

- [.clear()](#clear) Methodu Örnekleri:
> [.clear()](#clear) methodu, database'deki tüm veriyi siler ve dosyayı sıfırlar.

```js
/*
Database'deki veri:

{
  "test": {
    "testing": "nope.db"
  }
}
*/

db.clear() // -> true

/*
Database'deki veri:

{}
*/
```

</div>

---

<div id="backup">

---

- [.backup()](#backup) Methodu Örnekleri:
> [.backup()](#backup) methodu, 'db.json' içindeki verileri yeni bir json dosyasına kaydeder.

```js
db.backup('./nopeion.json') // -> true
```

</div>

---

<div id="loadBackup">

---

- [.loadBackup()](#loadBackup) Methodu Örnekleri:
> [.loadBackup()](#loadBackup) methodu, yedeklenen json dosyasının içindeki verileri 'db.json' dosyasına kaydeder.

```js
db.loadBackup('./nopeion.json') // -> true
```

</div>

---

<div id="support">

- Destek Adresleri
  - [Instagram](https://www.instagram.com/metehanardamutlu/)
  - [Discord Sunucum](https://discord.gg/trDF8fb)

</div>
