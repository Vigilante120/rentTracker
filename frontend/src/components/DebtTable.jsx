export default function DebtTable({ debts, onClear }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70">
      <table className="w-full text-sm">
        <thead className="bg-sand text-left">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Number</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {debts.length === 0 ? (
            <tr>
              <td className="px-4 py-5 text-slate-500" colSpan={4}>
                No active debts.
              </td>
            </tr>
          ) : (
            debts.map((debt) => (
              <tr key={debt.id} className="border-t border-slate-200">
                <td className="px-4 py-3">{debt.name}</td>
                <td className="px-4 py-3">{debt.number}</td>
                <td className="px-4 py-3">₹{debt.amount}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onClear(debt.id)}
                    className="rounded-full border border-teal px-3 py-1 text-teal hover:bg-teal hover:text-white transition-colors"
                  >
                    Cleared
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
