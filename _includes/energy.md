## Storing Energy inside a Capacitor

Let us imagine a capacitor with a capacitance of $$C$$, which a charge of $$+q$$ on one plate and a charge of $$-q$$ on the other. Then the potential difference between these plates are then $$V = \frac{q}{C}$$ as explained above.

Let us now attempt to move a charge of $$+\delta q$$ from the negative plate to the positive. Increasing the charge on the plates by $$\delta q$$ increases work stored by the capacitor by $$\delta W$$. From $$W = V \times Q$$, we can see that the work required to move this charge is $$\delta W = V(q) \delta q = \frac{q}{C} \delta q$$.

As we keep transferring charge, the total work stored in the capacitor increases. The rate of this increase is $$\frac{\delta W}{\delta q} = \frac{q}{C}$$, which is the same as the potential difference across the plates. To find the total work stored, we isolate $$W$$ and integrate from $$q = 0$$ to $$q = Q$$:

\\[ \int_0^Q \delta W = \int_0^Q \frac{q}{C} \delta q \\]
\\[ W = \frac{q^2}{2C} \\]

From $$Q = CV$$, we can rewrite this as:

\\[ W = \frac{CV^2}{2} \\]