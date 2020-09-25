function check(tc, el, type, expected, index) {
	wentWell = tc(el, type) == expected;
	if(!wentWell){
		console.log('\x1b[31mTest Failed.');
		if (typeof index == 'number') console.log(`${expected?'\x1b[32m+':'\x1b[31m-'}\x1b[0m type : ${conf.type}, index : ${i}`);
		else console.log(`\x1b[31m-\x1b[0m type : ${type}, in 'alwaysUse'.`);
	}
	return wentWell;
}

function test(tycker, configList) {
	let ret = true;
	for (let conf of configList) {
		let remaining = new Set(test.alwaysUse);
		if(conf.valids) conf.valids.forEach((el,i) => {
			ret &= check(tycker,el,conf.type,true,i);
			remaining.delete(el)
		});
		if(conf.invalids) conf.invalids.forEach((el,i) => {
			ret &= check(tycker,el,conf.type,false,i);
			remaining.delete(el);
		});
		remaining.forEach((el) => {
			ret &= check(tycker,el,conf.type,conf.remain || false);
			remaining.delete(el);
		});
	};
	return ret;
}

test.alwaysUse = [];

module.exports = test;