export const calculateSalaryPreview = (payroll) => {
  const { basicSalary = 0,hra = 0,travelAllowance = 0,ptax = 0,pfContributionEmployee = 0,tds = 0,specialAllowance = 0,
    grossSalaryWithTA = 0,grossSalaryWithoutTA = 0,numberOfDaysInMonth = 30,unpaidDays = 0,bonusOrOT = 0,adminCharges = 0,
    edliCharges = 0,gratuity = 0, } = payroll;
  console.log("grossSalaryWithTA",grossSalaryWithTA);
  console.log("unpaidDays",unpaidDays);
  console.log("numberOfDaysInMonth",numberOfDaysInMonth);
  const adjustment = (grossSalaryWithTA / numberOfDaysInMonth) * unpaidDays;
  console.log("adjustment",adjustment);

  const roundedAdjustment = Math.round(adjustment * 100) / 100;
//   console.log("ptax",ptax);
//   console.log("tds",tds);
//   console.log("roundedAdjustment",roundedAdjustment);
//   console.log("pfContributionEmployee",pfContributionEmployee);
  const totalDeductions = ptax + tds + roundedAdjustment + pfContributionEmployee;
  console.log("totalDeductions",totalDeductions);
  const roundedTotalDeductions = Math.round(totalDeductions * 100) / 100;

  const netSalary = Math.round((grossSalaryWithTA - totalDeductions + bonusOrOT) * 100) / 100;
//   console.log("netSalary",netSalary)
  const totalCTC = Math.round((adminCharges + edliCharges + gratuity + grossSalaryWithoutTA) * 100) / 100;

  return {
    adjustment: roundedAdjustment,
    totalDeductions: roundedTotalDeductions,
    netSalary,
    totalCTC,
  };
};
