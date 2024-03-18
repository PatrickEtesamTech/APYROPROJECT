using APYROPROJECT.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;
using Syncfusion.EJ2.Charts;
using System.Globalization;

namespace APYROPROJECT.Controllers
{
    public class DashboardController : Controller
    {


        private readonly ApplicationDBContext _context;
        public DashboardController(ApplicationDBContext context)
        {
                _context = context;
        }
        public async Task<ActionResult> Index()
        {

            //Last 7 days transaction

            DateTime StartDate = DateTime.Today.AddDays(-6);
            DateTime EndDate = DateTime.Today;

            List<Transaction> SelectedTransactions = await _context.Transaction
                .Include(x => x.Category)
                .Where(y => y.Date >= StartDate && y.Date <= EndDate)
                .ToListAsync();



            //Total Income

            int TotalIncome = SelectedTransactions
                .Where(i => i.Category.Type == "Income")
                .Sum(j => j.Amount);
            ViewBag.TotalIncome = TotalIncome.ToString("C0");


            //Total Expense
            int TotalExpense = SelectedTransactions
                .Where(i => i.Category.Type == "Expense")
                .Sum(j => j.Amount);
            ViewBag.TotalExpense = TotalExpense.ToString("C0");


            //Balance
            int Balance = TotalIncome - TotalExpense;
            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");
            culture.NumberFormat.CurrencyNegativePattern = 1;
            ViewBag.Balance = String.Format(culture,"{0:C0}",Balance);

            //Dougnut Chart - Expense By Category
            ViewBag.DougnutChartData = SelectedTransactions
                .Where(i => i.Category.Type == "Expense")
                .GroupBy(j => j.Category.CategoryId)
                .Select(k => new
                {
                    categoryTitleWithIcon = k.First().Category.Icon+ " " + k.First().Category.Title,
                    amount = k.Sum(j => j.Amount),
                    formattedamount = k.Sum(j => j.Amount).ToString("C0"),

                })
                .OrderByDescending(l=>l.amount) 
                .ToList();
             

          //Spline Chart - Income vs Expense

          //Income
          List<SplineChartData> IncomeSummary = SelectedTransactions
                .Where(i => i.Category.Type =="Income")
                .GroupBy(j=> j.Date)
                .Select( k => new SplineChartData()
                {
                    day = k.First().Date.ToString("dd-MMM"),
                    income = k.Sum(l=> l.Amount)
                })
                .ToList();
             

            //Expense
            List<SplineChartData> ExpenseSummary = SelectedTransactions
                  .Where(i => i.Category.Type == "Expense")
                  .GroupBy(j => j.Date)
                  .Select(k => new SplineChartData()
                  {
                      day = k.First().Date.ToString("dd-MMM"),
                      Expense = k.Sum(l => l.Amount)
                  })
                  .ToList();



            //Combine Income & Expense
            string[] Last7days = Enumerable.Range(0, 7)
                .Select(i => StartDate.AddDays(i).ToString("dd-MMM"))
                .ToArray();


            ViewBag.SplineChartData = from day in Last7days
                                      join income in IncomeSummary on day equals income.day
                                      into dayIncomeJoined
                                      from income in dayIncomeJoined.DefaultIfEmpty()
                                      join expense in ExpenseSummary on day equals expense.day into expenseJoined
                                      from expense in expenseJoined.DefaultIfEmpty()
                                      select new
                                      {
                                          day = day,
                                          income = income == null ? 0 : income.income,
                                          expense = expense == null ? 0 : expense.Expense,


                                      };


            //Recent Transactions
            ViewBag.RecentTransactions = await _context.Transaction
                .Include(i => i.Category)
                .OrderByDescending(j => j.Date)
                .Take(5)
                .ToListAsync();








            return View();






        }





    }

    public class SplineChartData
    {
        public string day;
        public int income;
        public int Expense;
    }
}
