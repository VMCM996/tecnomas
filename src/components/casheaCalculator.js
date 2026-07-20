// casheaCalculator.js

export function calculateCasheaDetails(price, tasaDolar, tasaCashea) {
  const precioEnDivisas = Number(price) || 0;
  const precioConAumento = precioEnDivisas / 0.92;
  const precioConAumentoBs = precioConAumento * Number(tasaDolar);
  
  // Evitamos división por cero o valores nulos
  const divisorTasa = Number(tasaCashea) || 1;
  const precioTotalCashea = Math.ceil(precioConAumentoBs / divisorTasa);
  
  const inicialDeCashea = precioTotalCashea * 0.2;
  const totalCuotas = precioTotalCashea - inicialDeCashea;
  const cuotasQuincenales = totalCuotas / 3;

  return {
    precioTotalCashea,
    inicialDeCashea,
    cuotasQuincenales,
  };
}