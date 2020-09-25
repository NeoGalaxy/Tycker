const Tycker = require('../src/tc');

const tests = ['1-checkingTypes','2-customTypes','3-others'];

success = true;
for (tname of tests) {
	w = '\x1b[37m';
	y = '\x1b[33m';
	yBG = '\x1b[43m';
	r = '\x1b[31m';
	g = '\x1b[32m';
	gray = '\x1b[90m';
	rset = '\x1b[0m';
	console.log(`${w}|---------    ${y}Running test '${tname}    ${w}---------|${rset}`);
	result = require('./'+tname)(Tycker);
	console.log(
		`${w}|---------  ${
			(result) ? g+'  Test successful  ' : r+yBG+' Test unsuccessful '+rset
		}  ${w}---------|${rset}`);
	success = success && result;
}

console.log(`
${(result?'':yBG)}${gray} ################################# 
         ${(success) ? g+'  All went good  ' : r+'A test went wrong'}         
${gray} ################################# ${rset}
`);