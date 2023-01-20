## Discharging a capacitor

When a charged capacitor with a capacitance of $$C$$ and an initial charge of $$Q_0$$ is connected in a circuit to a resistor with a resistance of $$R$$, charges will flow from the capacitor's positive plate, through the resistor, to the capacitor's negative plate. During this discharging process, the capacitor's electric potential energy is converted into internal energy by the resistor.

In this section, we will find a formula for the capacitor's charge $$Q$$ in terms of the time $$t$$.

Below is a simulation which demonstrates a capacitor being discharged through a resistor (each blue dot represents a negative charge, and each red dot represents a positive charge):

<div id="discharging-simulation"></div>

### Creating a differential equation

There are 3 facts about the circuit which we know:

1. The current $$I$$ in the circuit is the rate at which the capacitor’s charge $$Q$$ decreases, so \\[I = -\frac{dQ}{dt}\\]
2. Due to Ohm's Law, the current $$I$$ and the voltage $$V$$ are related by the resistor’s resistance $$R$$: \\[I=\frac{V}{R}\\]
3. The voltage $$V$$ and the charge $$Q$$ are related by the capacitor’s capacitance $$C$$: \\[Q=CV\\]

Combining the 3 equations above, we can produce a differential equation relating the charge $$Q$$ to the time $$t$$: \\[-\frac{dQ}{dt}=\frac{Q}{RC}\\]

### Solving the differential equation

Now, we will solve the differential equation in order to express $$Q$$ in terms of $$t$$.

First, we separate the variables:
\\[\frac{dQ}{Q}=-\frac{dt}{RC}\\]

Next, we integrate both sides:
\\[\int\frac{dQ}{Q}=\int-\frac{dt}{RC}\\]
\\[\ln Q=-\frac{t}{RC}+X\\]
\\[Q=e^X \cdot e^{-\frac{t}{RC}}\\]
where $$X$$ is a constant.

Initially, when $$t=0$$, the capacitor's charge $$Q$$ is equal to $$Q_0$$. This implies that $$e^X=Q_0$$. Therefore, we now have a formula expressing $$Q$$ in terms of $$t$$:
\\[Q=Q_0 \cdot e^{-\frac{t}{RC}}\\]

This shows that when a capacitor is discharged through a resistor, its charge decays exponentially. You can see this happening in the simulation which was shown at the beginning of this section.
