## Challenge problem

Here is a challenge problem to test your knowledge of the application of calculus to capacitors:

_A variable resistor is a resistor whose resistance changes over time. Suppose that we have a variable resistor with a resistance satisfying the function $$R=R_0+kt$$, where $$R_0$$ and $$k$$ are both constants, and $$t$$ represents the time. $$R_0$$ (measured in ohms) is the initial resistance, and $$k$$ (measured in ohms per second) is the rate at which the resistance changes._

_Now, a capacitor with a capacitance of $$C$$ and an initial charge of $$Q_0$$ is discharged through this variable resistor. Find an expression for the capacitor's charge $$Q$$ in terms of the time $$t$$._

---

<details markdown="1">
<summary style="font-weight: bold;">Click here to reveal the solution (after you have attempted to solve the problem!)</summary>
We can start by copying the differential equation from the [Creating a differential equation](#creating-a-differential-equation) section, except with $$R$$ replaced with $$R_0+kt$$ (the variable resistance):

\\[-\frac{dQ}{dt}=\frac{Q}{(R_0+kt) \cdot C}\\]

---

To solve this differential equation, we isolate the variables and then integrate both sides:
\\[\int -\frac{dQ}{Q}=\int \frac{dt}{(R_0+kt) \cdot C}\\]
\\[-\int \frac{1}{Q}dq=\frac{1}{R_0C}\int \frac{1}{1+\frac{k}{R_0}t}dt\\]
\\[-\ln Q=\frac{1}{R_0C}\cdot\ln\left(1+\frac{kt}{R_0}\right)\cdot\frac{R_0}{k}+X\\]
\\[\ln Q=-\frac{1}{kC}\cdot\ln\left(1+\frac{kt}{R_0}\right)-X\\]
\\[Q=e^{-X}\cdot\left(1+\frac{kt}{R_0}\right)^{-\frac{1}{kC}}\\]
where $$X$$ is a constant.

---

We know that $$Q=Q_0$$ when $$t=0$$, so $$e^{-X}=Q_0$$. Therefore, we now have a formula expressing $$Q$$ in terms of $$t$$:

\\[Q=Q_0\cdot\left(1+\frac{kt}{R_0}\right)^{-\frac{1}{kC}}\\]

</details>
