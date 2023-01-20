## Storing Energy inside a Capacitor

Let us imagine a capacitor with a capacitance of $$C$$, which a charge of $$+q$$ on one plate and a charge of $$-q$$ on the other. Then the potential difference between these plates are then $$V = \frac{q}{C}$$ as explained above.

![Moving a charge of +dq from one plate to another](assets/img/movingcharge.png)

Let us now attempt to move a charge of $$+dq$$ from the negative plate to the positive. Increasing the charge on the plates by $$dq$$ increases work stored by the capacitor by $$dW$$. From $$W = V \times Q$$, we can see that the work required to move this charge is $$dW = V(q)dq = \frac{q}{C} dq$$.

As we keep transferring charge, the total work stored in the capacitor increases. The rate of this increase is $$\frac{dW}{dq} = \frac{q}{C}$$, which is the same as the potential difference across the plates. To find the total work stored, we isolate $$W$$ and integrate from $$q = 0$$ to $$q = Q$$:

\\[ \int_0^Q dW = \int_0^Q \frac{q}{C} dq \\]
\\[ W = \frac{q^2}{2C} \\]

From $$Q = CV$$, we can rewrite this as:

\\[ W = \frac{CV^2}{2} \\]