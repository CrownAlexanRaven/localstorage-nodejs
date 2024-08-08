const fs=require("fs"),path=require("path");module.exports=class{constructor(t,s=!1){if(this.isAsync=s,this.store_prefix=path.join(process.cwd(),t),this.isAsync)(async()=>{try{let t=await fs.promises.stat(this.store_prefix);if(!t.isDirectory())throw Error(`${this.store_prefix} is not a directory! Remove it or rename it to create the localStorage object!`)}catch(s){if("ENOENT"===s.code)await fs.promises.mkdir(this.store_prefix,{recursive:!0});else throw s}})();else try{let e=fs.statSync(this.store_prefix);if(!e.isDirectory())throw Error(`${this.store_prefix} is not a directory! Remove it or rename it to create the localStorage object!`)}catch(i){if("ENOENT"===i.code)console.log("Creating localStorage database."),fs.mkdirSync(this.store_prefix,{recursive:!0});else throw i}}clear(){if(this.isAsync)(async()=>{let t=async s=>{let e=await fs.promises.readdir(s);for(let i of e){let r=path.join(s,i),a=await fs.promises.stat(r);a.isDirectory()?(await t(r),await fs.promises.rmdir(r)):await fs.promises.unlink(r)}};try{await fs.promises.access(this.store_prefix),await t(this.store_prefix)}catch(s){if("ENOENT"!==s.code)throw s}})();else{let t=s=>{let e=fs.readdirSync(s);for(let i of e){let r=path.join(s,i),a=fs.statSync(r);a.isDirectory()?(t(r),fs.rmdirSync(r)):fs.unlinkSync(r)}};fs.existsSync(this.store_prefix)&&t(this.store_prefix)}}removeItem(t){let s=path.join(this.store_prefix,t);this.isAsync?(async()=>{try{await fs.promises.access(s),await fs.promises.unlink(s)}catch(t){if("ENOENT"!==t.code)throw t}})():fs.existsSync(s)&&fs.unlinkSync(s)}setItem(t,s){let e=path.join(this.store_prefix,t);if(this.isAsync)return fs.promises.writeFile(e,s,"utf8");fs.writeFileSync(e,s,"utf8")}getItem(t){let s=path.join(this.store_prefix,t);if(this.isAsync)return(async()=>{try{return await fs.promises.access(s),await fs.promises.readFile(s,"utf8")}catch(t){if("ENOENT"===t.code)return null;throw t}})();try{return fs.readFileSync(s,"utf8")}catch(e){if("ENOENT"===e.code)return null;throw e}}get length(){let t=0,s=async e=>{let i=await fs.promises.readdir(e);for(let r of i){let a=path.join(e,r),o=await fs.promises.stat(a);o.isDirectory()?await s(a):t++}},e=s=>{let i=fs.readdirSync(s);for(let r of i){let a=path.join(s,r);fs.statSync(a).isDirectory()?e(a):t++}};return this.isAsync?(async()=>(await s(this.store_prefix),t))():(e(this.store_prefix),t)}};