## Challenge problem
To test your knowledge of the application of calculus to capacitors, here is a challenge problem:

A variable resistor is a resistor whose resistance changes over time. Suppose that we have a variable resistor with a resistance satisfying the function $$R=R_0+kt$$, where $$R_0$$ and $$k$$ are both constants. $$R_0$$ (measured in ohms) is the initial resistance, and $$k$$ (measured in ohms per second) is the rate at which the resistance changes.

Now, a capacitor with a capacitance of $$C$$ and an initial charge of $$Q_0$$ is discharged through this variable resistor. Find an expression for the capacitor's charge $$Q$$ in terms of the time $$t$$.

<details markdown="1">
<summary style="font-weight: bold;">Click here to reveal the solution (after you have attempted to solve the problem!)</summary>
We can start by copying the differential equation from the [Creating a differential equation](#creating-a-differential-equation) section, except with $$R$$ replaced with $$R_0+kt$$ (the variable resistance):

\\[-\frac{dQ}{dt}=\frac{Q}{(R_0+kt)C}\\]

To solve this differential equation, we isolate the variables and then integrate both sides:
\\[\int -\frac{dQ}{Q}=\int \frac{dt}{(R_0+kt)C}\\]
\\[-\int \frac{1}{Q}dq=\frac{1}{R_0C}\int \frac{1}{1+\frac{k}{R_0}t}dt\\]
</details>
