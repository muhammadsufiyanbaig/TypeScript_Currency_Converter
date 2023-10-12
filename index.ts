import inquirer from "inquirer";
import chalk from "chalk";

let apilink = "https://v6.exchangerate-api.com/v6/0a3768ac8450e813d1e597f2/latest/PKR";

let fetchData = async (data: any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};

let data = await fetchData(apilink);

let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({
    type: 'list',
    name: 'name',
    message: "converting from",
    choices: countries,
});

let userMoney = await inquirer.prompt({
    type: 'number',
    name: "rupee",
    message: `please enter the amount in ${chalk.redBright.bold(firstCountry.name)}`,
});

let secondCountry = await inquirer.prompt({
    type: 'list',
    name: 'name',
    message: "converting To",
    choices: countries,
});

let cnv = `https://v6.exchangerate-api.com/v6/0a3768ac8450e813d1e597f2/pair/${firstCountry.name}/${secondCountry.name}`;


let cnvData = async (data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};

let conversionrate = await cnvData(cnv);

let convertedrate = userMoney.rupee * conversionrate;
// console.log(convertedrate);

console.log(`your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.redBright(userMoney.rupee)} in ${chalk.bold.yellowBright(secondCountry.name)} 
is ${chalk.bold.blackBright(convertedrate)}`);

